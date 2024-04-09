"use server";

import prisma from "@/lib/db";
import { Area, Priority, Status } from "@prisma/client";

export const scaffoldDemoContent = async (exerciseId: string) => {
  const demoUser = await prisma.user.create({
    data: {
      name: "demo-user",
      exerciseId,
    },
  });

  const demoContent = supportTickets.map((ticket) => {
    const createdAt = getRandomStartDate();
    const priority = getRandomPriority();
    const area = getRandomArea();
    const status = getRandomStatus();

    return {
      ...ticket,
      status: status as Status,
      closedAt: status === "CLOSED" ? getRandomClosedAt(createdAt) : undefined,
      area: area as Area,
      priority: priority as Priority,
      createdAt: createdAt,
      email: "demo@user.no",
      startedAt:
        status === "CLOSED" || status === "IN_PROGRESS"
          ? getRandomStartedAt(createdAt)
          : undefined,
      exerciseId: exerciseId,
    };
  });

  const tickets = await prisma.ticket.createMany({
    data: demoContent,
  });
};

function getRandomStartedAt(createdAt: Date) {
  const randomOffset = Math.random() * 4 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000; // Random offset between 1 to 5 hours in milliseconds
  const randomTimestamp = createdAt.getTime() + randomOffset;
  return new Date(randomTimestamp);
}

function getRandomStatus() {
  const statuses = ["NEW", "IN_PROGRESS", "CLOSED"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

function getRandomPriority() {
  const priorities = ["LOW", "MEDIUM", "HIGH"];
  const randomIndex = Math.floor(Math.random() * priorities.length);
  return priorities[randomIndex];
}

function getRandomArea() {
  const areas = [
    "SERVICESENTER",
    "PROBLEMSTYRING",
    "ENDRINGSKONTROLL",
    "KAPASITET_OG_YTELSESSTYRING",
  ];
  const randomIndex = Math.floor(Math.random() * areas.length);
  return areas[randomIndex];
}

function getRandomStartDate() {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  ); // Calculate date 7 days ago
  const randomTimestamp =
    sevenDaysAgo.getTime() +
    Math.random() * (currentDate.getTime() - sevenDaysAgo.getTime());
  return new Date(randomTimestamp);
}

function getRandomClosedAt(startDate: Date) {
  const fourDaysAfter = new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000); // Calculate date 4 days after startDate
  const randomTimestamp =
    startDate.getTime() +
    Math.random() * (fourDaysAfter.getTime() - startDate.getTime());
  return new Date(randomTimestamp);
}

const supportTickets = [
  {
    title: "Feil ved oppdatering av betalingsinformasjon",
    content:
      "Jeg prøvde å oppdatere betalingsinformasjonen min, men systemet ga en feilmelding. Kan dere hjelpe meg med dette?",
  },
  {
    title: "Mistet passordet mitt",
    content:
      "Jeg har glemt passordet mitt og prøver å tilbakestille det, men jeg mottar ikke noen tilbakestillings-e-post. Kan dere hjelpe meg med å få tilgang til kontoen min igjen?",
  },
  {
    title: "Problemer med å laste ned filer",
    content:
      "Når jeg prøver å laste ned filer fra nettsiden, opplever jeg kontinuerlige feil. Kan dere sjekke hva som er galt?",
  },
  {
    title: "Spørsmål om fakturering",
    content:
      "Jeg har spørsmål angående faktureringen min og trenger hjelp til å forstå noen av kostnadene. Kan dere gi meg mer informasjon?",
  },
  {
    title: "Feil ved registrering av ny bruker",
    content:
      "Jeg prøvde å registrere en ny brukerkonto, men jeg får en feilmelding hver gang jeg prøver å fullføre registreringen. Hva kan være årsaken til dette?",
  },
  {
    title: "Treg responstid på nettstedet",
    content:
      "Nettstedet virker veldig tregt når jeg prøver å navigere eller laste inn sider. Kan dere undersøke og forbedre ytelsen?",
  },
  {
    title: "Mangler tilgang til visse funksjoner",
    content:
      "Jeg har ikke tilgang til visse funksjoner eller sider på nettstedet. Kan dere sjekke mine tilgangsrettigheter og løse dette?",
  },
  {
    title: "Feil i søkefunksjonaliteten",
    content:
      "Når jeg bruker søkefunksjonen på nettstedet, får jeg ikke relevante resultater tilbake. Kan dere undersøke og fikse dette?",
  },
  {
    title: "Produktfunksjonalitet virker ikke som forventet",
    content:
      "Jeg opplever problemer med enkelte funksjoner på produktet jeg bruker. Kan dere hjelpe meg med å få dem til å fungere som forventet?",
  },
  {
    title: "Tapt data etter en oppdatering",
    content:
      "Etter en nylig oppdatering av applikasjonen mistet jeg viktige data. Kan dere hjelpe meg med å gjenopprette dem?",
  },
  {
    title: "Feil ved gjennomføring av betaling",
    content:
      "Jeg prøvde å gjennomføre en betaling, men transaksjonen ble avvist flere ganger. Hva kan være årsaken til dette?",
  },
  {
    title: "Behov for teknisk hjelp med installasjon",
    content:
      "Jeg har problemer med å installere programvaren på datamaskinen min. Kan dere gi meg veiledning gjennom prosessen?",
  },
  {
    title: "Spørsmål angående abonnementet mitt",
    content:
      "Jeg trenger mer informasjon om mitt nåværende abonnement og eventuelle oppgraderingsmuligheter. Kan dere hjelpe meg?",
  },
  {
    title: "Innloggingen min virker ikke",
    content:
      "Jeg får en feilmelding hver gang jeg prøver å logge inn på kontoen min. Kan dere hjelpe meg med å gjenopprette tilgangen min?",
  },
  {
    title: "Behov for tilbakestilling av systeminnstillinger",
    content:
      "Jeg har gjort uønskede endringer i systeminnstillingene mine og trenger hjelp til å tilbakestille dem til standard. Kan dere veilede meg gjennom dette?",
  },
  {
    title: "Mangler tilgang til kundeservicekanalen",
    content:
      "Jeg har prøvd å kontakte kundeservice gjennom den tilgjengelige kanalen, men jeg får ingen respons. Kan dere hjelpe meg med å komme i kontakt?",
  },
  {
    title: "Feil ved visning av bestillingshistorikk",
    content:
      "Når jeg prøver å se min tidligere bestillingshistorikk, vises ingen oppføringer. Kan dere undersøke dette og gjenopprette historikken min?",
  },
  {
    title: "Behov for tilpasset opplæring",
    content:
      "Jeg ønsker tilpasset opplæring i bruken av programvaren. Kan dere tilby opplæringssesjoner eller ressurser?",
  },
  {
    title: "Rapportering av sikkerhetsproblem",
    content:
      "Jeg har oppdaget et sikkerhetsproblem på nettstedet og ønsker å rapportere det til teamet. Hvordan kan jeg gjøre dette på en sikker måte?",
  },
  {
    title: "Behov for hjelp med å gjenopprette slettede filer",
    content:
      "Jeg har ved et uhell slettet viktige filer og trenger hjelp til å gjenopprette dem. Kan dere hjelpe meg med dette?",
  },
  {
    title: "Feil ved visning av fakturainformasjon",
    content:
      "Når jeg prøver å se detaljert fakturainformasjon, vises ikke alle oppføringene. Kan dere undersøke dette og løse problemet?",
  },
  {
    title: "Behov for veiledning i bruk av et spesifikt verktøy",
    content:
      "Jeg trenger veiledning i bruk av et spesifikt verktøy eller funksjon innen programvaren. Kan dere gi meg veiledning gjennom dette?",
  },
  {
    title: "Opplever uventede feil i applikasjonen",
    content:
      "Applikasjonen krasjer eller viser uventede feilmeldinger ved bruk. Kan dere undersøke dette og fikse problemet?",
  },
  {
    title: "Behov for å endre kontoinformasjon",
    content:
      "Jeg trenger hjelp til å endre kontoinformasjonen min, inkludert e-postadresse og passord. Kan dere veilede meg gjennom denne prosessen?",
  },
  {
    title: "Feil ved utsjekking av handlekurv",
    content:
      "Når jeg prøver å fullføre en bestilling og gå til utsjekking, får jeg en feilmelding. Kan dere hjelpe meg med å fullføre bestillingen min?",
  },
  {
    title: "Behov for tilpasset rapportering",
    content:
      "Jeg trenger hjelp til å lage spesifikke rapporter eller datauttak fra systemet. Kan dere tilby tilpassede rapporteringsløsninger?",
  },
  {
    title: "Feil ved integrasjon med tredjepartsverktøy",
    content:
      "Jeg opplever problemer med integrasjonen mellom programvaren og et tredjepartsverktøy. Kan dere undersøke dette og fikse problemet?",
  },
  {
    title: "Tapt forbindelse til nettverket",
    content:
      "Jeg mister kontinuerlig forbindelsen til nettverket mens jeg bruker applikasjonen. Kan dere undersøke nettverksproblemer fra deres side?",
  },
  {
    title: "Spørsmål angående lisensiering",
    content:
      "Jeg trenger mer informasjon om programvarelisensen min og eventuelle begrensninger. Kan dere gi meg mer informasjon?",
  },
  {
    title: "Behov for tilpassede tilleggsfunksjoner",
    content:
      "Jeg har spesifikke behov som ikke dekkes av standardfunksjonaliteten. Kan dere tilby tilpassede tilleggsfunksjoner eller tilpasninger?",
  },
  {
    title: "Feil ved visning av produktpriser",
    content:
      "Når jeg prøver å se produktprisene, vises de ikke riktig eller er feil. Kan dere undersøke dette og rette opp feilen?",
  },
  {
    title: "Mangler tilgang til supportdokumentasjon",
    content:
      "Jeg har problemer med å få tilgang til supportdokumentasjonen og veiledningene. Kan dere sikre at dokumentasjonen er tilgjengelig?",
  },
  {
    title: "Feil ved visning av brukerprofiler",
    content:
      "Når jeg prøver å se brukerprofiler, vises de ikke riktig eller mangler informasjon. Kan dere undersøke dette og rette opp feilen?",
  },
  {
    title: "Behov for å endre abonnementstype",
    content:
      "Jeg ønsker å endre abonnementstypen min, inkludert oppgraderinger eller nedgraderinger. Kan dere hjelpe meg med dette?",
  },
  {
    title: "Feil ved visning av produktbeskrivelser",
    content:
      "Når jeg prøver å se produktbeskrivelser, vises de ikke riktig eller mangler informasjon. Kan dere undersøke dette og rette opp feilen?",
  },
  {
    title: "Behov for tilgang til tidligere fakturaer",
    content:
      "Jeg trenger tilgang til tidligere fakturaer eller kvitteringer for regnskapsformål. Kan dere hjelpe meg med dette?",
  },
  {
    title: "Feil ved prosessen for å legge til produkter i handlekurven",
    content:
      "Jeg opplever problemer når jeg prøver å legge til produkter i handlekurven min. Kan dere undersøke dette og fikse problemet?",
  },
  {
    title: "Mangler bekreftelsese-post etter registrering",
    content:
      "Jeg har registrert meg, men har ikke mottatt bekreftelsese-posten. Kan dere hjelpe meg med å fullføre registreringsprosessen?",
  },
  {
    title: "Behov for tilgang til eksportfunksjoner",
    content:
      "Jeg trenger tilgang til eksportfunksjoner for å eksportere dataene mine til et annet format. Kan dere hjelpe meg med dette?",
  },
  {
    title: "Feil ved visning av ordrehistorikk",
    content:
      "Når jeg prøver å se min tidligere ordrehistorikk, vises ingen oppføringer. Kan dere undersøke dette og gjenopprette historikken min?",
  },
  {
    title: "Behov for teknisk støtte etter kontortid",
    content:
      "Jeg har behov for teknisk støtte utenfor vanlig kontortid. Kan dere tilby alternativer for nødstilfeller?",
  },
  {
    title: "Feil ved levering av e-postvarsler",
    content:
      "Jeg har ikke mottatt forventede e-postvarsler fra systemet. Kan dere sjekke statusen på e-postvarsler?",
  },
  {
    title: "Behov for tilpasset rapportering av salgsdata",
    content:
      "Jeg trenger tilpassede rapporter over salgsdataene mine for å analysere ytelsen. Kan dere tilby tilpassede rapporteringsløsninger?",
  },
  {
    title: "Feil ved behandling av bestillinger",
    content:
      "Jeg har opplevd forsinkelser eller feil i behandlingen av mine bestillinger. Kan dere undersøke og rette opp problemet?",
  },
];
