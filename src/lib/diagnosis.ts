import { randomUUID } from "crypto";
import { deleteJson, listJson, readJson, writeJson } from "@/lib/admin/blob-store";

export type DiagnosisOption = {
  id: string;
  label: string;
  whatsappMessage: string;
  created_at: string;
};

const DIAGNOSIS_PREFIX = "data/diagnosis/";
const diagnosisPath = (id: string) => `${DIAGNOSIS_PREFIX}${id}.json`;

// Opções originais do site, usadas como fallback enquanto o admin não
// cadastrar nenhuma opção própria no Blob.
const fallbackOptions: DiagnosisOption[] = [
  {
    id: "nao-gelando",
    label: "Não está gelando",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado não está gelando e gostaria de solicitar uma avaliação.",
    created_at: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "pingando",
    label: "Está pingando",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está pingando e gostaria de solicitar uma avaliação.",
    created_at: "2024-01-01T00:00:01.000Z",
  },
  {
    id: "barulho",
    label: "Está fazendo barulho",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está fazendo barulho e gostaria de solicitar uma avaliação.",
    created_at: "2024-01-01T00:00:02.000Z",
  },
  {
    id: "mau-cheiro",
    label: "Está com mau cheiro",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está com mau cheiro e gostaria de solicitar uma avaliação.",
    created_at: "2024-01-01T00:00:03.000Z",
  },
  {
    id: "limpeza",
    label: "Precisa de limpeza",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site e gostaria de solicitar uma limpeza/higienização do meu ar-condicionado.",
    created_at: "2024-01-01T00:00:04.000Z",
  },
  {
    id: "instalar",
    label: "Quero instalar um aparelho",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site e gostaria de solicitar um orçamento para instalação de ar-condicionado.",
    created_at: "2024-01-01T00:00:05.000Z",
  },
  {
    id: "comprar",
    label: "Quero comprar um equipamento",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site e gostaria de saber mais sobre a compra de um ar-condicionado.",
    created_at: "2024-01-01T00:00:06.000Z",
  },
  {
    id: "outro",
    label: "Outro problema",
    whatsappMessage:
      "Olá, encontrei a Mac Climatização pelo site. Meu ar-condicionado está com um problema e gostaria de solicitar uma avaliação.",
    created_at: "2024-01-01T00:00:07.000Z",
  },
];

export async function getDiagnosisOptions(): Promise<DiagnosisOption[]> {
  const options = await listJson<DiagnosisOption>(DIAGNOSIS_PREFIX);
  if (options.length === 0) {
    // Semeia as opções originais como registros reais na primeira leitura,
    // para que editar/excluir funcione normalmente a partir daqui.
    await Promise.all(
      fallbackOptions.map((option) => writeJson(diagnosisPath(option.id), option))
    );
    return fallbackOptions;
  }
  return options.sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export async function getDiagnosisOptionById(
  id: string
): Promise<DiagnosisOption | null> {
  return readJson<DiagnosisOption>(diagnosisPath(id));
}

export async function createDiagnosisOption(input: {
  label: string;
  whatsappMessage: string;
}): Promise<void> {
  const option: DiagnosisOption = {
    id: randomUUID(),
    label: input.label,
    whatsappMessage: input.whatsappMessage,
    created_at: new Date().toISOString(),
  };
  await writeJson(diagnosisPath(option.id), option);
}

export async function updateDiagnosisOption(
  id: string,
  input: { label: string; whatsappMessage: string }
): Promise<void> {
  const existing = await getDiagnosisOptionById(id);
  await writeJson(diagnosisPath(id), {
    id,
    label: input.label,
    whatsappMessage: input.whatsappMessage,
    created_at: existing?.created_at ?? new Date().toISOString(),
  });
}

export async function deleteDiagnosisOption(id: string): Promise<void> {
  await deleteJson(diagnosisPath(id));
}
