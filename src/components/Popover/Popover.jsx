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
import { createPortal } from "react-dom";

export default function Popover({
  children,
  renderPopover,
  className,
  initialOpen,
}) {
  const [open, setOpen] = useState(initialOpen || false);

  const id = useId();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    // middleware: [offset(2), shift(), arrow({ element: arrowRef })],
    middleware: [offset(2), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: "bottom-start",
  });

  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                // transformOrigin: "top",
                // transformOrigin: "top",
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: `scale(0)` }}
              animate={{ opacity: 1, transform: `scale(1)` }}
              exit={{ opacity: 0, transform: `scale(0)` }}
              transition={{ duration: 0.2 }}
            >
              {/*  Arrow ?. */}
              {/* <span
                ref={arrowRef}
                style={{
                  // left: `${middlewareData.arrow?.x !== undefined ? middlewareData.arrow.x * 1.55 : 0}px`,
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                }}
                className="absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white"
              ></span> */}
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
