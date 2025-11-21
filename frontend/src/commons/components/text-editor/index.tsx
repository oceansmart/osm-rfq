"use client";

import type { ComponentProps, HTMLAttributes, Key, ReactNode, Ref } from "react";
import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { Extension } from "@tiptap/core";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { BubbleMenu } from "@tiptap/react/menus";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { Editor, EditorContentProps, EditorOptions } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold01,
    Dotpoints01,
    Image01,
    Italic01,
    Link01,
    Stars02,
    Type01,
    Underline01,
} from "@untitledui/icons";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { type Color, ColorField, ColorSwatch, Dialog, DialogTrigger, Label as AriaLabel, Popover, Radio, RadioGroup, parseColor } from "react-aria-components";
import { HintText, Label } from "@/commons/components/input";
import { InputBase } from "@/commons/components/input";
import { type SelectItemType, Select } from "@/commons/components/select";
import { Tooltip } from "@/commons/components/tooltip";
import { cx } from "@/commons/utils/cx";

// ============================================================================
// Helper Functions
// ============================================================================

// Creates a data URL for an SVG resize handle with a given color.
const getResizeHandleBg = (color: string) => {
    return `url(data:image/svg+xml;base64,${btoa(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 10" stroke="${color}" stroke-linecap="round"/><path d="M11 7L7 11" stroke="${color}" stroke-linecap="round"/></svg>`)})`;
};

// ============================================================================
// Character Count Extension (Tiptap)
// ============================================================================

// This extension is a modified version of the original character count extension.
// It removes the limit and trim functionality and only counts characters and words.
//
// SOURCE: https://tiptap.dev/api/extensions/character-count

interface CharacterCountOptions {
    /**
     * The mode by which the size is calculated. If set to `textSize`, the textContent of the document is used.
     * If set to `nodeSize`, the nodeSize of the document is used.
     * @default 'textSize'
     * @example 'textSize'
     */
    mode: "textSize" | "nodeSize";
    /**
     * The text counter function to use. Defaults to a simple character count.
     * @default (text) => text.length
     * @example (text) => [...new Intl.Segmenter().segment(text)].length
     */
    textCounter: (text: string) => number;
    /**
     * The word counter function to use. Defaults to a simple word count.
     * @default (text) => text.split(' ').filter(word => word !== '').length
     * @example (text) => text.split(/\s+/).filter(word => word !== '').length
     */
    wordCounter: (text: string) => number;
}

interface CharacterCountStorage {
    /**
     * Get the number of characters for the current document.
     * @param options The options for the character count. (optional)
     * @param options.node The node to get the characters from. Defaults to the current document.
     * @param options.mode The mode by which the size is calculated. If set to `textSize`, the textContent of the document is used.
     */
    characters: (options?: { node?: ProseMirrorNode; mode?: "textSize" | "nodeSize" }) => number;

    /**
     * Get the number of words for the current document.
     * @param options The options for the character count. (optional)
     * @param options.node The node to get the words from. Defaults to the current document.
     */
    words: (options?: { node?: ProseMirrorNode }) => number;
}

/**
 * This extension allows you to count the characters and words of your document.
 * @see https://tiptap.dev/api/extensions/character-count
 */
const CharacterCount = Extension.create<CharacterCountOptions, CharacterCountStorage>({
    name: "characterCount",

    addOptions() {
        return {
            limit: null,
            mode: "textSize",
            textCounter: (text) => text.length,
            wordCounter: (text) => text.split(" ").filter((word) => word !== "").length,
        };
    },

    addStorage() {
        return {
            characters: () => 0,
            words: () => 0,
        };
    },

    onBeforeCreate() {
        this.storage.characters = (options) => {
            const node = options?.node || this.editor.state.doc;
            const mode = options?.mode || this.options.mode;

            if (mode === "textSize") {
                const text = node.textBetween(0, node.content.size, undefined, " ");

                return this.options.textCounter(text);
            }

            return node.nodeSize;
        };

        this.storage.words = (options) => {
            const node = options?.node || this.editor.state.doc;
            const text = node.textBetween(0, node.content.size, " ", " ");

            return this.options.wordCounter(text);
        };
    },
});

// ============================================================================
// Editor Context
// ============================================================================

type EditorContextType = {
    editor: Editor;
    editorId: string;
    isDisabled?: boolean;
    limit?: number;
    isInvalid?: boolean;
};

const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditorContext must be used within a EditorProvider");
    }
    return context;
};

// ============================================================================
// EditorButton Component
// ============================================================================

interface EditorButtonProps extends ButtonProps {
    isActive?: boolean;
}

const EditorButton = ({ isActive, isDisabled, className, children, ...props }: EditorButtonProps) => {
    return (
        <AriaButton
            {...props}
            type="button"
            isDisabled={isDisabled}
            className={(state) =>
                cx(
                    "flex size-8 cursor-pointer items-center justify-center rounded-md p-0! text-fg-quaternary outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 pressed:bg-primary_hover pressed:outline-hidden",
                    isActive ? "bg-primary_hover text-fg-secondary" : "hover:bg-primary_hover hover:text-fg-quaternary_hover",
                    isDisabled && "cursor-not-allowed",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {children}
        </AriaButton>
    );
};

// ============================================================================
// Text Editor Extensions (Toolbar Buttons)
// ============================================================================

const fonts = [
    { id: "Inter", label: "Inter" },
    { id: "Comic Sans MS, Comic Sans", label: "Comic Sans" },
    { id: "serif", label: "serif" },
    { id: "monospace", label: "monospace" },
    { id: "cursive", label: "cursive" },
];

const fontSizes = [
    { id: "12px", label: "12px" },
    { id: "14px", label: "14px" },
    { id: "16px", label: "16px" },
    { id: "18px", label: "18px" },
    { id: "20px", label: "20px" },
    { id: "22px", label: "22px" },
    { id: "24px", label: "24px" },
    { id: "26px", label: "26px" },
    { id: "28px", label: "28px" },
    { id: "30px", label: "30px" },
    { id: "32px", label: "32px" },
];

const colorSwatches = [
    "#181D27",
    "#252B37",
    "#414651",
    "#535862",
    "#717680",
    "#A4A7AE",
    "#D5D7DA",
    "#FFFFFF",
    "#079455",
    "#1570EF",
    "#444CE7",
    "#6938EF",
    "#BA24D5",
    "#DD2590",
    "#D92D20",
    "#E04F16",
];

/**
 * Text editor button that toggles bold text.
 */
export const TextEditorBold = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isBold } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isBold: editor?.isActive("bold") ?? false,
        }),
    });

    const handleToggleBold = useCallback(() => {
        const { from, to } = editor.state.selection;
        const hasSelection = from !== to;

        if (editor.isActive("bold") && !hasSelection) {
            // If cursor is within bold text but no text is selected, extend the mark range before toggling
            editor.chain().focus().extendMarkRange("bold").toggleBold().run();
        } else {
            // If not in bold text OR text is already selected, just toggle normally
            editor.chain().focus().toggleBold().run();
        }
    }, [editor]);

    return (
        <EditorButton aria-label="Bold ⌘B" isDisabled={isDisabled} isActive={isBold} onClick={handleToggleBold} className={className}>
            <Bold01 className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles italic text.
 */
export const TextEditorItalic = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isItalic } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isItalic: editor?.isActive("italic") ?? false,
        }),
    });

    const handleToggleItalic = useCallback(() => {
        const { from, to } = editor.state.selection;
        const hasSelection = from !== to;

        if (editor.isActive("italic") && !hasSelection) {
            // If cursor is within italic text but no text is selected, extend the mark range before toggling
            editor.chain().focus().extendMarkRange("italic").toggleItalic().run();
        } else {
            // If not in italic text OR text is already selected, just toggle normally
            editor.chain().focus().toggleItalic().run();
        }
    }, [editor]);

    return (
        <EditorButton aria-label="Italic ⌘I" isDisabled={isDisabled} isActive={isItalic} onClick={handleToggleItalic} className={className}>
            <Italic01 className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles underline text.
 */
export const TextEditorUnderline = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isUnderline } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isUnderline: editor?.isActive("underline") ?? false,
        }),
    });

    const handleToggleUnderline = useCallback(() => {
        const { from, to } = editor.state.selection;
        const hasSelection = from !== to;

        if (editor.isActive("underline") && !hasSelection) {
            // If cursor is within underlined text but no text is selected, extend the mark range before toggling
            editor.chain().focus().extendMarkRange("underline").toggleUnderline().run();
        } else {
            // If not in underlined text OR text is already selected, just toggle normally
            editor.chain().focus().toggleUnderline().run();
        }
    }, [editor]);

    return (
        <EditorButton aria-label="Underline ⌘U" isDisabled={isDisabled} isActive={isUnderline} onClick={handleToggleUnderline} className={className}>
            <Underline01 className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles bullet list.
 */
export const TextEditorBulletList = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isBulletList } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isBulletList: editor?.isActive("bulletList") ?? false,
        }),
    });

    return (
        <EditorButton
            aria-label="Bullet list"
            isDisabled={isDisabled}
            isActive={isBulletList}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={className}
        >
            <Dotpoints01 className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles left alignment.
 */
export const TextEditorAlignLeft = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isAlignLeft } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isAlignLeft: editor?.isActive("textAlign", { align: "left" }) ?? false,
        }),
    });

    return (
        <EditorButton
            aria-label="Left align"
            isDisabled={isDisabled}
            isActive={isAlignLeft}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={className}
        >
            <AlignLeft className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles center alignment.
 */
export const TextEditorAlignCenter = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isAlignCenter } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isAlignCenter: editor?.isActive("textAlign", { align: "center" }) ?? false,
        }),
    });

    return (
        <EditorButton
            aria-label="Center align"
            isDisabled={isDisabled}
            isActive={isAlignCenter}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={className}
        >
            <AlignCenter className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles right alignment.
 */
export const TextEditorAlignRight = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isAlignRight } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isAlignRight: editor?.isActive("textAlign", { align: "right" }) ?? false,
        }),
    });

    return (
        <EditorButton
            aria-label="Align right ⌘R"
            isDisabled={isDisabled}
            isActive={isAlignRight}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={className}
        >
            <AlignRight className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that toggles justify alignment.
 */
export const TextEditorAlignJustify = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isAlignJustify } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isAlignJustify: editor?.isActive("textAlign", { align: "justify" }) ?? false,
        }),
    });

    return (
        <EditorButton
            aria-label="Align justify ⌘J"
            isDisabled={isDisabled}
            isActive={isAlignJustify}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={className}
        >
            <AlignJustify className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button that generates text.
 */
export const TextEditorGenerate = () => {
    const { isDisabled } = useEditorContext();

    return (
        <EditorButton aria-label="Generate" isDisabled={isDisabled}>
            <Stars02 className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button for inserting a link.
 */
export const TextEditorLink = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { isLink } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isLink: editor?.isActive("link") ?? false,
        }),
    });

    const handleSetLink = useCallback(() => {
        const { from, to } = editor.state.selection;
        const hasSelection = from !== to;

        // If cursor is within a link but no text is selected, extend the mark range first to select the entire link
        if (editor.isActive("link") && !hasSelection) {
            editor.chain().focus().extendMarkRange("link").run();
        }

        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Please enter a link", previousUrl);

        // Cancelled.
        if (url === null) {
            return;
        }

        // If empty, remove link.
        if (url === "") {
            if (editor.isActive("link") && !hasSelection) {
                // If cursor is within link but no text selected, extend mark range before removing
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
            } else {
                // If text is selected or not in link, just remove normally
                editor.chain().focus().unsetLink().run();
            }
            return;
        }

        // Update or set link.
        if (editor.isActive("link") && !hasSelection) {
            // If cursor is within link but no text selected, extend mark range before updating
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        } else {
            // If text is selected or no link, just set normally
            editor.chain().focus().setLink({ href: url }).run();
        }
    }, [editor]);

    return (
        <EditorButton aria-label="Link ⌘K" isDisabled={isDisabled} isActive={isLink} onClick={handleSetLink} className={className}>
            <Link01 className="size-5" />
        </EditorButton>
    );
};

/**
 * Text editor button for inserting an image.
 */
export const TextEditorImage = ({ className }: { className?: string }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { editor, isDisabled } = useEditorContext();

    const { isImage } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isImage: editor?.isActive("image") ?? false,
        }),
    });

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const blobUrl = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: blobUrl }).run();
        },
        [editor],
    );

    return (
        <>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            <EditorButton aria-label="Insert image" isDisabled={isDisabled} isActive={isImage} onClick={triggerFileUpload} className={className}>
                <Image01 className="size-5" />
            </EditorButton>
        </>
    );
};

/**
 * Text editor button for changing the text color.
 */
export const TextEditorColor = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();
    const [selectionColor, setSelectionColor] = useState<string | undefined>();
    const [customColor, setCustomColor] = useState<Color>(parseColor("#7F56D9"));
    const [color, setColor] = useState<Color>(parseColor(colorSwatches[0]));

    useEffect(() => {
        const handleSelectionUpdate = ({ editor }: { editor: Editor }) => {
            setSelectionColor(editor.getAttributes("textStyle").color);
        };

        editor.on("selectionUpdate", handleSelectionUpdate);

        return () => {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor]);

    const handleCustomColorChange = (value: Color | null) => {
        if (!value) return;

        // If the custom color is already selected, update the color.
        if (color.toString("hex") === customColor.toString("hex")) {
            setColor(value);
        }

        setCustomColor(value);
    };

    const handleColorChange = useCallback(
        (value: string) => {
            setColor(parseColor(value));
            const { from, to } = editor.state.selection;
            const hasSelection = from !== to;

            if (editor.getAttributes("textStyle").color && !hasSelection) {
                // If cursor is within colored text but no text selected, extend the mark range before setting color
                editor.chain().focus().extendMarkRange("textStyle").setColor(value).run();
            } else {
                // If text is selected or not in colored text, just set color normally
                editor.chain().focus().setColor(value).run();
            }
        },
        [editor, setColor],
    );

    return (
        <DialogTrigger>
            <Tooltip title="Text color">
                <EditorButton aria-label="Text color" isDisabled={isDisabled} className={className}>
                    <div
                        style={{
                            outlineColor: selectionColor || colorSwatches[0],
                            backgroundColor: selectionColor || colorSwatches[0],
                        }}
                        className="size-4 rounded-full ring-1 ring-black/10 ring-inset in-pressed:outline-[1.5px] in-pressed:outline-offset-2"
                    />
                </EditorButton>
            </Tooltip>

            <Popover>
                <Dialog className="rounded-xl bg-primary_alt p-3 shadow-lg ring-1 ring-secondary_alt outline-none">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <RadioGroup className="flex flex-col items-start gap-2" value={color?.toString("hex")} onChange={handleColorChange}>
                            <div className="grid grid-cols-8 gap-1">
                                {colorSwatches.map((color) => (
                                    <Radio key={color} value={color} className="p-0.5">
                                        {({ isSelected, isFocused }) => (
                                            <ColorSwatch
                                                style={{
                                                    outlineColor: color,
                                                }}
                                                color={color}
                                                className={cx(
                                                    "size-4 cursor-pointer rounded-full ring-1 ring-black/10 ring-inset",
                                                    (isSelected || isFocused) && "outline-2 outline-offset-2",
                                                )}
                                            />
                                        )}
                                    </Radio>
                                ))}
                            </div>
                            <div className="flex w-full shrink-0 items-center">
                                <AriaLabel className="mr-3 text-sm font-semibold text-primary">Custom</AriaLabel>
                                <Radio value={customColor.toString("hex")}>
                                    {({ isSelected, isFocused }) => (
                                        <>
                                            <ColorSwatch
                                                style={{
                                                    outlineColor: customColor.toString("hex"),
                                                    backgroundColor: customColor.toString("hex"),
                                                }}
                                                className={cx(
                                                    "mr-2 size-4 shrink-0 cursor-pointer rounded-full ring-1 ring-black/10 ring-inset",
                                                    (isSelected || isFocused) && "outline-2 outline-offset-2",
                                                )}
                                            />
                                        </>
                                    )}
                                </Radio>
                                <ColorField aria-label="Custom color" className="flex min-w-0 flex-1" value={customColor} onChange={handleCustomColorChange}>
                                    <InputBase size="sm" wrapperClassName="flex-1 w-23 min-w-0" />
                                </ColorField>
                            </div>
                        </RadioGroup>
                    </div>
                </Dialog>
            </Popover>
        </DialogTrigger>
    );
};

/**
 * Text editor button for changing the text font family.
 */
export const TextEditorFontFamily = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { currentFontFamily } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            currentFontFamily: editor?.getAttributes("textStyle")?.fontFamily || fonts[0].id,
        }),
    });

    const handleFontFamilyChange = useCallback(
        (value: Key | null) => {
            editor
                .chain()
                .focus()
                .setFontFamily(value as string)
                .run();
        },
        [editor],
    );

    return (
        <Select
            aria-label="Font family"
            size="sm"
            items={fonts}
            isDisabled={isDisabled}
            className={cx("w-full md:w-38", className)}
            selectedKey={currentFontFamily}
            placeholderIcon={Type01}
            onSelectionChange={handleFontFamilyChange}
        >
            {(font: SelectItemType) => (
                <Select.Item
                    id={font.id}
                    style={{
                        fontFamily: font.id,
                    }}
                >
                    {font.label}
                </Select.Item>
            )}
        </Select>
    );
};

/**
 * Text editor button for changing the text font size.
 */
export const TextEditorFontSize = ({ className }: { className?: string }) => {
    const { editor, isDisabled } = useEditorContext();

    const { currentFontSize } = useEditorState({
        editor,
        selector: ({ editor }) => ({
            currentFontSize: editor?.getAttributes("textStyle")?.fontSize || fontSizes[2].id,
        }),
    });

    const handleFontSizeChange = useCallback(
        (value: Key | null) => {
            editor
                .chain()
                .focus()
                .setFontSize(value as string)
                .run();
        },
        [editor],
    );

    return (
        <Select
            aria-label="Font size"
            size="sm"
            items={fontSizes}
            isDisabled={isDisabled}
            className={cx("w-full md:w-22", className)}
            selectedKey={currentFontSize}
            onSelectionChange={handleFontSizeChange}
        >
            {(fontSize: SelectItemType) => (
                <Select.Item id={fontSize.id} className="[&_svg:not([data-icon])]:hidden">
                    {fontSize.label}
                </Select.Item>
            )}
        </Select>
    );
};

// ============================================================================
// TextEditorToolbar Component
// ============================================================================

interface TextEditorToolbarProps {
    className?: string;
    type?: "simple" | "advanced";
    floating?: boolean;
    hideFontSize?: boolean;
    ref?: Ref<HTMLDivElement>;
}

export const TextEditorToolbar = ({ className, ref, type = "simple", floating = false, hideFontSize }: TextEditorToolbarProps) => {
    if (type === "simple") {
        return (
            <div
                className={cx(
                    "flex w-max flex-wrap gap-0.5 md:flex-nowrap",
                    floating && "rounded-lg bg-primary p-1 shadow-lg ring-1 ring-secondary_alt",
                    className,
                )}
            >
                <Tooltip title="Bold ⌘B">
                    <TextEditorBold />
                </Tooltip>
                <Tooltip title="Italic ⌘I">
                    <TextEditorItalic />
                </Tooltip>
                <Tooltip title="Underline ⌘U">
                    <TextEditorUnderline />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <TextEditorColor />

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Left align">
                    <TextEditorAlignLeft />
                </Tooltip>
                <Tooltip title="Center align">
                    <TextEditorAlignCenter />
                </Tooltip>
                <Tooltip title="Bullet list">
                    <TextEditorBulletList />
                </Tooltip>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={cx(
                "flex w-max flex-col items-start justify-center gap-2 md:flex-row md:items-center md:justify-start md:gap-3",
                floating && "rounded-xl bg-primary p-2 shadow-lg ring-1 ring-secondary_alt",
                className,
            )}
        >
            {!floating && (
                <div className="flex gap-2">
                    <TextEditorFontFamily />
                    {!hideFontSize && <TextEditorFontSize />}
                </div>
            )}

            <div className="flex flex-wrap gap-0.5 md:flex-nowrap">
                <Tooltip title="Bold ⌘B">
                    <TextEditorBold />
                </Tooltip>
                <Tooltip title="Italic ⌘I">
                    <TextEditorItalic />
                </Tooltip>
                <Tooltip title="Underline ⌘U">
                    <TextEditorUnderline />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <TextEditorColor />

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Left align">
                    <TextEditorAlignLeft />
                </Tooltip>
                <Tooltip title="Center align">
                    <TextEditorAlignCenter />
                </Tooltip>
                <Tooltip title="Bullet list">
                    <TextEditorBulletList />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Link ⌘K">
                    <TextEditorLink />
                </Tooltip>
                <Tooltip title="Insert image">
                    <TextEditorImage />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Generate">
                    <TextEditorGenerate />
                </Tooltip>
            </div>
        </div>
    );
};

// ============================================================================
// TextEditorTooltip Component (BubbleMenu)
// ============================================================================

interface TextEditorTooltipProps {
    className?: string;
}

export const TextEditorTooltip = ({ className }: TextEditorTooltipProps) => {
    const { editor } = useEditorContext();

    return (
        <BubbleMenu
            editor={editor}
            className={cx(
                "dark-mode z-10 flex origin-bottom flex-wrap gap-0.5 rounded-xl bg-primary p-1.5 shadow-lg ring-1 ring-secondary duration-100 animate-in fade-in ring-inset slide-in-from-bottom-0.5 zoom-in-95 md:flex-nowrap",
                className,
            )}
        >
            <TextEditorBold />
            <TextEditorItalic />
            <TextEditorUnderline />
            <TextEditorAlignLeft />
            <TextEditorAlignCenter />
            <TextEditorLink />
        </BubbleMenu>
    );
};

// ============================================================================
// TextEditor Main Components
// ============================================================================

interface TextEditorRootProps extends Partial<EditorOptions> {
    className?: string;
    isDisabled?: boolean;
    limit?: number;
    placeholder?: string;
    isInvalid?: boolean;
    children?: ReactNode;
    inputClassName?: string;
    ref?: Ref<HTMLDivElement>;
}

const TextEditorRoot = ({
    className,
    inputClassName,
    children,
    isInvalid,
    isDisabled,
    limit,
    placeholder = "Write something...",
    ...editorOptions
}: TextEditorRootProps) => {
    const id = useId();
    const editorId = `editor-${id}`;

    const editor = useEditor({
        ...editorOptions,
        editable: !isDisabled,
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                blockquote: {
                    HTMLAttributes: {
                        class: "my-3.5 border-l-4 border-secondary pl-4",
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-7",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-7",
                    },
                },
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: "https",
                    HTMLAttributes: {
                        class: "text-primary underline",
                    },
                },
            }),
            TextStyleKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "my-3",
                },
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === "bulletList" || node.type.name === "orderedList") return "";
                    return placeholder;
                },
                emptyEditorClass:
                    "first:before:text-placeholder first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:absolute",
            }),
            CharacterCount,
        ],

        editorProps: {
            attributes: {
                id: editorId,
                ["aria-labelledby"]: `${editorId}-label`,
                ["aria-describedby"]: `${editorId}-hint`,
                style: `
                    --resize-handle-bg: ${getResizeHandleBg("#D5D7DA")};
                    --resize-handle-bg-dark: ${getResizeHandleBg("#373A41")};
                `,
                class: cx(
                    "w-full resize scroll-py-3 overflow-auto rounded-lg bg-primary p-5 text-md leading-[1.5] text-primary caret-fg-brand-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset selection:bg-fg-brand-primary/10 placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:ring-2 focus:ring-brand focus:outline-hidden",

                    // Resize handle
                    "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)",

                    isDisabled && "cursor-not-allowed bg-disabled_subtle text-disabled ring-disabled",
                    isInvalid && "ring-error_subtle focus:ring-2 focus:ring-error",
                    inputClassName,
                ),
            },
        },
    });

    useEffect(() => {
        const setLink = () => {
            if (!editor) return;

            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt("Please enter a link", previousUrl);

            // Cancelled.
            if (url === null) {
                return;
            }

            // If empty, remove link.
            if (url === "") {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();

                return;
            }

            // Update link.
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        };

        // Add a keyboard shortcut listener to handle link clicks
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey && event.key === "k") {
                setLink();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <EditorContext.Provider value={{ editor, isDisabled, limit, isInvalid, editorId }}>
            <div className={cx("flex w-full flex-col gap-3", className)}>{children}</div>
        </EditorContext.Provider>
    );
};

interface TextEditorContentProps extends Omit<EditorContentProps, "editor"> {
    ref?: Ref<HTMLDivElement>;
}

const TextEditorContent = ({ ...props }: TextEditorContentProps) => {
    const { editor, isDisabled } = useEditorContext();

    return <EditorContent disabled={isDisabled} {...props} editor={editor} />;
};

interface TextEditorLabelProps extends ComponentProps<typeof Label> {}

const TextEditorLabel = ({ children, ...props }: TextEditorLabelProps) => {
    const { editor, editorId } = useEditorContext();

    return (
        <Label
            {...props}
            id={`${editorId}-label`}
            onClick={() => {
                editor.chain().focus().run();
            }}
        >
            {children}
        </Label>
    );
};

interface TextEditorHintTextProps extends HTMLAttributes<HTMLElement> {}

const TextEditorHintText = ({ children, ...props }: TextEditorHintTextProps) => {
    const { editor, editorId, limit, isInvalid } = useEditorContext();

    if (!children && !limit) return null;

    const charactersLeft = typeof limit === "number" ? limit - editor.storage?.characterCount?.characters() : 0;
    const exceedsLimit = charactersLeft < 0;

    return (
        <HintText {...props} id={`${editorId}-hint`} isInvalid={isInvalid || exceedsLimit} className={cx(limit && "tabular-nums", props.className)}>
            {children || `${charactersLeft.toLocaleString()} character${charactersLeft === 1 ? "" : "s"} left`}
        </HintText>
    );
};

export const TextEditor = {
    Root: TextEditorRoot,
    Toolbar: TextEditorToolbar,
    Tooltip: TextEditorTooltip,
    Content: TextEditorContent,
    Label: TextEditorLabel,
    HintText: TextEditorHintText,
};
