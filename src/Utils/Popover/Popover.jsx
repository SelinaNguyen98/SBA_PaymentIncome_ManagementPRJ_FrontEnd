import { useId, useState } from "react";
import {
  useFloating,
  FloatingPortal,
  shift,
  offset,
  autoUpdate,
  useHover,
  useFocus,
  safePolygon,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// Component Popover
export default function Popover({
  // Prop children: Nội dung của Popover
  // eslint-disable-next-line react/prop-types
  children,
  // Prop renderPopover: Hàm render nội dung Popover
  // eslint-disable-next-line react/prop-types
  renderPopover,
  // Prop className: Class cho Popover
  // eslint-disable-next-line react/prop-types
  className,
  // Prop initialOpen: Trạng thái ban đầu của Popover
  // eslint-disable-next-line react/prop-types
  initialOpen,
}) {
  // State để theo dõi trạng thái mở/đóng của Popover
  const [open, setOpen] = useState(initialOpen || false);

  // Hook để tạo ra một ID duy nhất cho Popover
  const id = useId();

  // Hook sử dụng Floating API để quản lý vị trí của Popover khi mở/đóng
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(2), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: "bottom-start",
  });

  // Các hooks sử dụng cho tương tác với Popover (hover, focus, dismiss, role)
  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  // Hook sử dụng để quản lý các tương tác (hover, focus, dismiss, role)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // Render Popover
  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {/* Portal để render nội dung Popover ở một nơi khác trong DOM tree */}
      <FloatingPortal id={id}>
        {/* Sử dụng AnimatePresence để thực hiện animation khi hiển thị/mất Popover */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                transformOrigin: `left top`,
                zIndex: 1000, // Đặt giá trị zIndex cao hơn
              }}
              {...getFloatingProps({ hover })}
              initial={{ opacity: 0, transform: `scale(0)` }}
              animate={{ opacity: 1, transform: `scale(1)` }}
              exit={{ opacity: 0, transform: `scale(0)` }}
              transition={{ duration: 0.2 }}
            >
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
