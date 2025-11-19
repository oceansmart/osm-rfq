/**
 * Untitled UI Icons
 *
 * Centralized icon exports from @untitledui/icons package.
 * 1,100+ free SVG icons with consistent design.
 *
 * Usage:
 * ```tsx
 * import { ArrowRight, Check, X } from '@/commons/components/icons'
 *
 * <Button iconLeading={ArrowRight}>Next</Button>
 * ```
 */

// Navigation Icons
export { default as ArrowLeft } from '@untitledui/icons/ArrowLeft';
export { default as ArrowRight } from '@untitledui/icons/ArrowRight';
export { default as ArrowUp } from '@untitledui/icons/ArrowUp';
export { default as ArrowDown } from '@untitledui/icons/ArrowDown';
export { default as ChevronLeft } from '@untitledui/icons/ChevronLeft';
export { default as ChevronRight } from '@untitledui/icons/ChevronRight';
export { default as ChevronUp } from '@untitledui/icons/ChevronUp';
export { default as ChevronDown } from '@untitledui/icons/ChevronDown';

// Action Icons
export { default as Plus } from '@untitledui/icons/Plus';
export { default as Minus } from '@untitledui/icons/Minus';
export { default as Check } from '@untitledui/icons/Check';
export { default as X } from '@untitledui/icons/X';
export { default as Edit } from '@untitledui/icons/Edit';
export { default as Trash } from '@untitledui/icons/Trash';
export { default as Save } from '@untitledui/icons/Save';
export { default as Download } from '@untitledui/icons/Download';
export { default as Upload } from '@untitledui/icons/Upload';
export { default as Copy } from '@untitledui/icons/Copy';

// Status Icons
export { default as AlertCircle } from '@untitledui/icons/AlertCircle';
export { default as CheckCircle } from '@untitledui/icons/CheckCircle';
export { default as XCircle } from '@untitledui/icons/XCircle';
export { default as Info } from '@untitledui/icons/Info';
export { default as AlertTriangle } from '@untitledui/icons/AlertTriangle';

// Communication Icons
export { default as Mail } from '@untitledui/icons/Mail';
export { default as MessageSquare } from '@untitledui/icons/MessageSquare';
export { default as Phone } from '@untitledui/icons/Phone';
export { default as Send } from '@untitledui/icons/Send';

// Media Icons
export { default as Image } from '@untitledui/icons/Image';
export { default as File } from '@untitledui/icons/File';
export { default as FileText } from '@untitledui/icons/FileText';
export { default as Folder } from '@untitledui/icons/Folder';
export { default as Video } from '@untitledui/icons/Video';

// User Icons
export { default as User } from '@untitledui/icons/User';
export { default as Users } from '@untitledui/icons/Users';
export { default as UserPlus } from '@untitledui/icons/UserPlus';
export { default as UserMinus } from '@untitledui/icons/UserMinus';

// UI Icons
export { default as Menu } from '@untitledui/icons/Menu';
export { default as MoreVertical } from '@untitledui/icons/MoreVertical';
export { default as MoreHorizontal } from '@untitledui/icons/MoreHorizontal';
export { default as Search } from '@untitledui/icons/Search';
export { default as Filter } from '@untitledui/icons/Filter';
export { default as Settings } from '@untitledui/icons/Settings';
export { default as Home } from '@untitledui/icons/Home';
export { default as Grid } from '@untitledui/icons/Grid';
export { default as List } from '@untitledui/icons/List';
export { default as Calendar } from '@untitledui/icons/Calendar';
export { default as Clock } from '@untitledui/icons/Clock';
export { default as Eye } from '@untitledui/icons/Eye';
export { default as EyeOff } from '@untitledui/icons/EyeOff';
export { default as Lock } from '@untitledui/icons/Lock';
export { default as Unlock } from '@untitledui/icons/Unlock';
export { default as Star } from '@untitledui/icons/Star';
export { default as Heart } from '@untitledui/icons/Heart';
export { default as Bell } from '@untitledui/icons/Bell';
export { default as Bookmark } from '@untitledui/icons/Bookmark';

// Business Icons
export { default as ShoppingCart } from '@untitledui/icons/ShoppingCart';
export { default as CreditCard } from '@untitledui/icons/CreditCard';
export { default as DollarSign } from '@untitledui/icons/DollarSign';
export { default as TrendingUp } from '@untitledui/icons/TrendingUp';
export { default as TrendingDown } from '@untitledui/icons/TrendingDown';
export { default as BarChart } from '@untitledui/icons/BarChart';
export { default as PieChart } from '@untitledui/icons/PieChart';

// Utility Icons
export { default as Loader } from '@untitledui/icons/Loader';
export { default as RefreshCw } from '@untitledui/icons/RefreshCw';
export { default as ExternalLink } from '@untitledui/icons/ExternalLink';
export { default as Link } from '@untitledui/icons/Link';
export { default as Unlink } from '@untitledui/icons/Unlink';
export { default as Maximize } from '@untitledui/icons/Maximize';
export { default as Minimize } from '@untitledui/icons/Minimize';
export { default as ZoomIn } from '@untitledui/icons/ZoomIn';
export { default as ZoomOut } from '@untitledui/icons/ZoomOut';

/**
 * Icon Component Type
 *
 * All Untitled UI icons follow this structure:
 * - Accept `size`, `color`, `className` props
 * - Default size: 24px
 * - Can be used as React components
 */
export type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  className?: string;
}>;
