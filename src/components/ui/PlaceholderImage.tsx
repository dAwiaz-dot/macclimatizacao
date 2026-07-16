import { clsx } from "clsx";
import { ImageOff } from "lucide-react";

type Props = {
  label: string;
  className?: string;
};

/**
 * Placeholder visível usado onde uma fotografia real da Mac Climatização
 * ainda não foi adicionada. Substitua pelo componente <Image> do Next.js
 * assim que a foto real estiver disponível em /public/images.
 */
export function PlaceholderImage({ label, className }: Props) {
  return (
    <div
      role="img"
      aria-label={`Imagem pendente: ${label}`}
      className={clsx(
        "flex flex-col items-center justify-center gap-2 border-2 border-dashed border-mac-sky-200 bg-ice-100 text-center text-mac-navy-400",
        className
      )}
    >
      <ImageOff className="h-8 w-8" aria-hidden="true" />
      <span className="px-4 text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
