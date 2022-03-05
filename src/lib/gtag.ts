type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: string;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
