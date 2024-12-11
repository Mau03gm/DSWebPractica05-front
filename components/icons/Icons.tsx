import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
//import FontAwesome from "@expo/vector-icons/FontAwesome";

export const ChatIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="comment" size={size} color={color} {...props} />;

export const AboutIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => (
  <FontAwesome6 name="circle-question" size={size} color={color} {...props} />
);

export const CloudSave = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="cloud" size={size} color={color} {...props} />;

export const PlayIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="play" size={size} color={color} {...props} />;

export const TrashIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="trash" size={size} color={color} {...props} />;

export const ClipBoard = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="clipboard" size={size} color={color} {...props} />;

export const Pen = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="pen" size={size} color={color} {...props} />;

export const Eye = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="eye" size={size} color={color} {...props} />;

export const ChevronLeft = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="chevron-left" size={size} color={color} {...props} />;

export const CancelIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="xmark" size={size} color={color} {...props} />;

export const CheckIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="check" size={size} color={color} {...props} />;

export const RefreshIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => (
  <FontAwesome6 name="arrows-rotate" size={size} color={color} {...props} />
);

export const ShoppingCart = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="cart-plus" size={size} color={color} {...props} />;

export const ClipBoardList = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => (
  <FontAwesome6 name="clipboard-list" size={size} color={color} {...props} />
);

export const BoxIcon = ({
  color = "black",
  size = 25,
  ...props
}: {
  color?: string;
  size?: number;
  [key: string]: any;
}) => <FontAwesome6 name="box" size={size} color={color} {...props} />;
