import React from "react";

export const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={`mt-12 mb-4 border-t border-zinc-200 dark:border-zinc-800 pt-6 text-xl font-semibold tracking-tight ${props.className ?? ""}`}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={`mt-4 leading-7 text-zinc-700 dark:text-zinc-300 ${props.className ?? ""}`}
    />
  ),
};
