import React from "react";

export const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mt-12 mb-4 border-t border-zinc-200 pt-6 text-xl font-semibold tracking-tight"
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="my-4 leading-relaxed text-zinc-700"
    />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="my-4 list-disc pl-6" />
  ),

  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="my-1" />
  ),
};
