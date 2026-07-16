"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Tem certeza que deseja excluir este item?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        aria-label="Excluir"
        className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
