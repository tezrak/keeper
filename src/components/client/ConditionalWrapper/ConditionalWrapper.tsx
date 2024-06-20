export function ConditionalWrapper(props: {
  wrapWhen: boolean;
  wrapper(children: React.ReactNode): React.ReactNode;
  children: React.ReactNode;
}) {
  if (props.wrapWhen) {
    return props.wrapper(props.children);
  }
  return props.children;
}
