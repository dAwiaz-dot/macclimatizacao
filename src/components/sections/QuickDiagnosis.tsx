import { getContent, defaultQuickDiagnosisHeader } from "@/lib/site-content";
import { getDiagnosisOptions } from "@/lib/diagnosis";
import { QuickDiagnosisClient } from "./QuickDiagnosisClient";

export async function QuickDiagnosis() {
  const [header, options] = await Promise.all([
    getContent("quickDiagnosisHeader", defaultQuickDiagnosisHeader),
    getDiagnosisOptions(),
  ]);

  return <QuickDiagnosisClient header={header} options={options} />;
}
