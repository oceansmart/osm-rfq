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
export { ArrowLeft } from '@untitledui/icons';
export { ArrowRight } from '@untitledui/icons';
export { ArrowUp } from '@untitledui/icons';
export { ArrowDown } from '@untitledui/icons';
export { ChevronLeft } from '@untitledui/icons';
export { ChevronRight } from '@untitledui/icons';
export { ChevronUp } from '@untitledui/icons';
export { ChevronDown } from '@untitledui/icons';

// Action Icons
export { Plus } from '@untitledui/icons';
export { Minus } from '@untitledui/icons';
export { Check } from '@untitledui/icons';
export { X } from '@untitledui/icons';
export { Edit05 as Edit } from '@untitledui/icons'; // Using Edit05 as default edit icon
export { Trash01 as Trash } from '@untitledui/icons'; // Using Trash01 as default
export { Save01 as Save } from '@untitledui/icons'; // Using Save01 as default
export { Download01 as Download } from '@untitledui/icons'; // Using Download01 as default
export { Upload01 as Upload } from '@untitledui/icons'; // Using Upload01 as default
export { Copy01 as Copy } from '@untitledui/icons'; // Using Copy01 as default

// Status Icons
export { AlertCircle } from '@untitledui/icons';
export { CheckCircle } from '@untitledui/icons';
export { XCircle } from '@untitledui/icons';
export { InfoCircle as Info } from '@untitledui/icons';
export { AlertTriangle } from '@untitledui/icons';

// Communication Icons
export { Mail01 as Mail } from '@untitledui/icons';
export { MessageSquare01 as MessageSquare } from '@untitledui/icons';
export { Phone01 as Phone } from '@untitledui/icons';
export { Send01 as Send } from '@untitledui/icons';

// Media Icons
export { Image01 as Image } from '@untitledui/icons';
export { File01 as File } from '@untitledui/icons';
export { File02 as FileText } from '@untitledui/icons'; // Using File02 as text file icon
export { Folder } from '@untitledui/icons';
export { VideoRecorder as Video } from '@untitledui/icons';

// User Icons
export { User01 as User } from '@untitledui/icons';
export { Users01 as Users } from '@untitledui/icons';
export { UserPlus01 as UserPlus } from '@untitledui/icons';
export { UserMinus01 as UserMinus } from '@untitledui/icons';

// UI Icons
export { Menu01 as Menu } from '@untitledui/icons';
export { DotsVertical as MoreVertical } from '@untitledui/icons';
export { DotsHorizontal as MoreHorizontal } from '@untitledui/icons';
export { SearchMd as Search } from '@untitledui/icons';
export { FilterLines as Filter } from '@untitledui/icons';
export { Settings01 as Settings } from '@untitledui/icons';
export { Home01 as Home } from '@untitledui/icons';
export { Grid01 as Grid } from '@untitledui/icons';
export { List } from '@untitledui/icons';
export { Calendar } from '@untitledui/icons';
export { Clock } from '@untitledui/icons';
export { Eye } from '@untitledui/icons';
export { EyeOff } from '@untitledui/icons';
export { Lock01 as Lock } from '@untitledui/icons';
export { LockUnlocked01 as Unlock } from '@untitledui/icons';
export { Star01 as Star } from '@untitledui/icons';
export { Heart } from '@untitledui/icons';
export { Bell01 as Bell } from '@untitledui/icons';
export { Bookmark } from '@untitledui/icons';

// Business Icons
export { ShoppingCart01 as ShoppingCart } from '@untitledui/icons';
export { CreditCard01 as CreditCard } from '@untitledui/icons';
export { CurrencyDollar as DollarSign } from '@untitledui/icons';
export { TrendUp01 as TrendingUp } from '@untitledui/icons'; // Fixed: TrendUp01 not TrendingUp01
export { TrendDown01 as TrendingDown } from '@untitledui/icons'; // Fixed: TrendDown01 not TrendingDown01
export { BarChart01 as BarChart } from '@untitledui/icons';
export { PieChart01 as PieChart } from '@untitledui/icons';

// Utility Icons
export { Loading01 as Loader } from '@untitledui/icons';
export { RefreshCw01 as RefreshCw } from '@untitledui/icons';
export { LinkExternal01 as ExternalLink } from '@untitledui/icons';
export { Link01 as Link } from '@untitledui/icons';
export { LinkBroken01 as Unlink } from '@untitledui/icons';
export { Maximize01 as Maximize } from '@untitledui/icons';
export { Minimize01 as Minimize } from '@untitledui/icons';
export { ZoomIn } from '@untitledui/icons';
export { ZoomOut } from '@untitledui/icons';

/**
 * ============================================================================
 * Custom Payment Icons (Input Component Integration)
 * ============================================================================
 *
 * These payment brand icons are custom SVG React components used exclusively
 * in the Input component for credit card type detection.
 *
 * Note: While the hybrid icon system typically uses /public/icons for custom
 * SVGs, these are kept here as React components for better integration with
 * the Input component's dynamic icon rendering system.
 *
 * Location: src/commons/components/icons/*.tsx
 * Usage: src/commons/components/input/index.tsx
 */
export { default as AmexIcon } from './amex-icon';
export { default as ApplePayIcon } from './apple-pay-icon';
export { default as DiscoverIcon } from './discover-icon';
export { default as ExcelIcon } from './excel-icon';
export { default as MastercardIcon } from './mastercard-icon';
export { default as VisaIcon } from './visa-icon';
export { default as PayPalIcon } from './paypal-icon';
export { default as StripeIcon } from './stripe-icon';
export { default as UnionPayIcon } from './union-pay-icon';

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
