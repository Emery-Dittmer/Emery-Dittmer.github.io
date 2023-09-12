import React from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import Image, { StaticImageData } from 'next/image';

export default function Card({
  title,
  description,
  company,
  large,
  mediaSrc,
  linkText,
  linkUrl,
}: {
  company: string;
  title: string;
  description: string;
  large?: boolean;
  mediaSrc: StaticImageData;
  linkText: string;
  linkUrl: string;
}) {
  return (
    <div
      className={`relative col-span-1 h-auto overflow-hidden shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="max-h-60 overflow-hidden flex justify-center items-center mt-4">
        <div className="max-h-60 overflow-hidden flex justify-center items-center">
        <Image src={mediaSrc} alt={title} width={100} height={40} unoptimized />
        </div>
      </div>
      <div className="mx-auto max-w-md text-center p-4">
        <h2 className="bg-gradient-to-br from-white to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal single-line-spacing">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="prose-sm leading-normal text-gray-500 md:prose">
          <Balancer>
            <div style={{ marginTop: "16px" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                      className="font-medium text-gray-800 underline transition-colors blue-link"
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      {...props}
                      className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                    />
                  ),
                }}
              >
                {description}
              </ReactMarkdown>
            </div>
          </Balancer>
        </div>
        <div className="mt-4">
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-300 hover:text-blue-700"

          >
            {linkText}
          </a>
        </div>
        <div className="mt-2">
        </div>
        <div className="mt-2 text-xs text-gray-400">{company}</div>
      </div>
    </div>
  );
}
