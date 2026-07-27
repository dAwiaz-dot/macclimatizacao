import {
  getContent,
  defaultHero,
  defaultAbout,
  defaultTrustBar,
  defaultWhyChooseUs,
  defaultMaintenanceBenefits,
  defaultProcessTimeline,
  defaultResidentialCommercial,
  defaultFinalCta,
  defaultQuickDiagnosisHeader,
  defaultBeforeAfterHeader,
  defaultServiceArea,
  defaultFooter,
  defaultHeader,
  defaultBranding,
  defaultContactPage,
} from "@/lib/site-content";
import {
  HeroForm,
  AboutForm,
  TrustBarForm,
  WhyChooseUsForm,
  MaintenanceBenefitsForm,
  ProcessTimelineForm,
  ResidentialCommercialForm,
  FinalCtaForm,
  QuickDiagnosisHeaderForm,
  BeforeAfterHeaderForm,
  ServiceAreaForm,
  FooterForm,
  HeaderForm,
  BrandingForm,
  ContactPageForm,
} from "./ContentForms";

export default async function ConteudoPage() {
  const [
    hero,
    about,
    trustBar,
    whyChooseUs,
    maintenanceBenefits,
    processTimeline,
    residentialCommercial,
    finalCta,
    quickDiagnosisHeader,
    beforeAfterHeader,
    serviceArea,
    footer,
    header,
    branding,
    contactPage,
  ] = await Promise.all([
    getContent("hero", defaultHero),
    getContent("about", defaultAbout),
    getContent("trustBar", defaultTrustBar),
    getContent("whyChooseUs", defaultWhyChooseUs),
    getContent("maintenanceBenefits", defaultMaintenanceBenefits),
    getContent("processTimeline", defaultProcessTimeline),
    getContent("residentialCommercial", defaultResidentialCommercial),
    getContent("finalCta", defaultFinalCta),
    getContent("quickDiagnosisHeader", defaultQuickDiagnosisHeader),
    getContent("beforeAfterHeader", defaultBeforeAfterHeader),
    getContent("serviceArea", defaultServiceArea),
    getContent("footer", defaultFooter),
    getContent("header", defaultHeader),
    getContent("branding", defaultBranding),
    getContent("contactPage", defaultContactPage),
  ]);

  const sections = [
    { title: "Marca (logo do site)", body: <BrandingForm content={branding} /> },
    { title: "Cabeçalho e botão de orçamento", body: <HeaderForm content={header} /> },
    { title: "Seção Início (banner principal)", body: <HeroForm content={hero} /> },
    { title: "Barra de confiança (ícones logo abaixo do banner)", body: <TrustBarForm content={trustBar} /> },
    { title: "Diagnóstico rápido (cabeçalho)", body: <QuickDiagnosisHeaderForm content={quickDiagnosisHeader} /> },
    { title: "Seção Sobre", body: <AboutForm content={about} /> },
    { title: "Antes e depois (cabeçalho)", body: <BeforeAfterHeaderForm content={beforeAfterHeader} /> },
    { title: "Por que escolher a Mac Climatização", body: <WhyChooseUsForm content={whyChooseUs} /> },
    { title: "Processo de atendimento", body: <ProcessTimelineForm content={processTimeline} /> },
    { title: "Residencial e Comercial", body: <ResidentialCommercialForm content={residentialCommercial} /> },
    { title: "Manutenção preventiva", body: <MaintenanceBenefitsForm content={maintenanceBenefits} /> },
    { title: "Onde atendemos", body: <ServiceAreaForm content={serviceArea} /> },
    { title: "Chamada final (antes do rodapé)", body: <FinalCtaForm content={finalCta} /> },
    { title: "Rodapé", body: <FooterForm content={footer} /> },
    { title: "Página de Contato", body: <ContactPageForm content={contactPage} /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Conteúdo do site</h1>
      <p className="mt-1 text-sm text-slate-500">
        Texto e foto de todas as seções da landing page.
      </p>

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-mac-navy-100 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-mac-navy-800">{section.title}</h2>
            <div className="mt-6">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
