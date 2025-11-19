import { Button } from "@/commons/components/button";

export default function TestButtonPage() {
    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold mb-8">Button Component Verification</h1>

            {/* Size Variants */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Size Variants</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    <Button size="sm">Small Button</Button>
                    <Button size="md">Medium Button</Button>
                    <Button size="lg">Large Button</Button>
                    <Button size="xl">Extra Large Button</Button>
                </div>
            </section>

            {/* Color Variants */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Color Variants</h2>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Primary</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="primary">Primary</Button>
                        <Button color="primary" disabled>Primary Disabled</Button>
                        <Button color="primary" isLoading>Primary Loading</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Secondary</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="secondary">Secondary</Button>
                        <Button color="secondary" disabled>Secondary Disabled</Button>
                        <Button color="secondary" isLoading>Secondary Loading</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Tertiary</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="tertiary">Tertiary</Button>
                        <Button color="tertiary" disabled>Tertiary Disabled</Button>
                        <Button color="tertiary" isLoading>Tertiary Loading</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Link Gray</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="link-gray">Link Gray</Button>
                        <Button color="link-gray" disabled>Link Gray Disabled</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Link Color</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="link-color">Link Color</Button>
                        <Button color="link-color" disabled>Link Color Disabled</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Primary Destructive</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="primary-destructive">Primary Destructive</Button>
                        <Button color="primary-destructive" disabled>Primary Destructive Disabled</Button>
                        <Button color="primary-destructive" isLoading>Primary Destructive Loading</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Secondary Destructive</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="secondary-destructive">Secondary Destructive</Button>
                        <Button color="secondary-destructive" disabled>Secondary Destructive Disabled</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Tertiary Destructive</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="tertiary-destructive">Tertiary Destructive</Button>
                        <Button color="tertiary-destructive" disabled>Tertiary Destructive Disabled</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Link Destructive</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button color="link-destructive">Link Destructive</Button>
                        <Button color="link-destructive" disabled>Link Destructive Disabled</Button>
                    </div>
                </div>
            </section>

            {/* Icon Buttons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Icon Buttons (Placeholder)</h2>
                <div className="flex gap-4 flex-wrap">
                    <Button color="primary" size="md">
                        <span data-icon>🔍</span>
                        With Leading Icon
                    </Button>
                    <Button color="secondary" size="md">
                        With Trailing Icon
                        <span data-icon>→</span>
                    </Button>
                </div>
            </section>

            {/* Visual Inspection Notes */}
            <section className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Visual Inspection Checklist</h2>
                <div className="space-y-2 text-sm">
                    <p>✓ Check if all buttons render with proper colors</p>
                    <p>✓ Check if disabled states are visually distinct</p>
                    <p>✓ Check if loading spinners animate correctly</p>
                    <p>✓ Check if hover states work (interactive feedback)</p>
                    <p>✓ Check if focus outlines appear on keyboard navigation</p>
                    <p>✓ Open DevTools → Inspect buttons → Check Computed styles</p>
                    <p>✓ Look for any missing CSS variables (var(--undefined-token))</p>
                    <p>✓ Check console for any Tailwind warnings</p>
                </div>
            </section>
        </div>
    );
}
