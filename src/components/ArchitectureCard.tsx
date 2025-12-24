"use client";

import { useRef, useState, useEffect } from "react";
import { ArchitectureDiagram, ArchitectureDiagramRef } from "./ArchitectureDiagram";

export function ArchitectureCard() {
  const diagramRef = useRef<ArchitectureDiagramRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDiagram = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Call fitView after modal opens
  useEffect(() => {
    if (isModalOpen && diagramRef.current) {
      // Wait for modal to fully render
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          diagramRef.current?.fitView();
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleViewDiagram}
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-4 transition-colors"
        >
          View technical diagram
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  System Architecture
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Ingestion → n8n orchestration → LLM processing → structured output
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    requestAnimationFrame(() => {
                      diagramRef.current?.fitView();
                    });
                  }}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Reset view
                </button>
                <button
                  onClick={handleCloseModal}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="w-full" style={{ minHeight: "520px" }}>
              <ArchitectureDiagram
                ref={diagramRef}
                showHeader={false}
                isInModal={true}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
