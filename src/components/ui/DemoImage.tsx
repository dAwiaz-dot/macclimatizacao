import Image from "next/image";
import { clsx } from "clsx";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Imagem de demonstração (banco de imagens gratuito), usada apenas para o
 * cliente visualizar o layout com fotos. Marca um selo "Foto ilustrativa"
 * para deixar claro que ainda não é uma fotografia real da Mac Climatização.
 * Substitua por <Image> apontando para /public/images assim que houver
 * fotos reais — remova este componente e o selo junto.
 */
export function DemoImage({ src, alt, className, priority }: Props) {
  // Fotos enviadas pelo painel admin ficam no Vercel Blob (URL completa);
  // as imagens de demonstração que vieram no template usam /images/ local.
  // Só a foto de demonstração leva o selo — foto real do cliente não.
  const isDemo = src.startsWith("/images/");

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {isDemo && (
        <span className="absolute bottom-3 right-3 rounded-full bg-mac-navy-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          Foto ilustrativa — substituir
        </span>
      )}
    </div>
  );
}
