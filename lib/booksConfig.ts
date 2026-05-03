import { StaticImageData } from 'next/image'
import bookDefault from '@/assets/coolstuff/book.png'

export type Book = {
  id: string
  title: string
  author: string
  coverSrc: StaticImageData
  yearRead?: number
  summary: { en: string; fr: string }
  keyPoints: { en: string[]; fr: string[] }
}

export const booksConfig: Book[] = [
  {
    id: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverSrc: bookDefault,
    yearRead: 2023,
    summary: {
      en: 'Kahneman explores two modes of thought: System 1, which is fast, intuitive and emotional, and System 2, which is slower, more deliberate and logical. The book reveals how cognitive biases shape our decisions and judgements in ways we rarely notice.',
      fr: 'Kahneman explore deux modes de pensée : le Système 1, rapide et intuitif, et le Système 2, plus lent et délibéré. Le livre révèle comment les biais cognitifs façonnent nos décisions de manières que nous remarquons rarement.',
    },
    keyPoints: {
      en: [
        'System 1 is fast and automatic — it handles routine tasks but is prone to bias',
        'System 2 is slow and deliberate — engaged for complex reasoning but easily fatigued',
        'Anchoring bias causes us to rely too heavily on the first piece of information we receive',
        'Loss aversion means losses feel roughly twice as painful as equivalent gains feel good',
        'Overconfidence in our own predictions is one of the most costly cognitive errors',
      ],
      fr: [
        'Le Système 1 est rapide et automatique, mais sujet aux biais',
        'Le Système 2 est lent et délibéré, engagé pour le raisonnement complexe mais facilement fatigué',
        'Le biais d\'ancrage nous fait trop dépendre de la première information reçue',
        'L\'aversion aux pertes signifie que les pertes font environ deux fois plus mal que les gains équivalents font du bien',
        'La confiance excessive dans nos propres prédictions est l\'une des erreurs cognitives les plus coûteuses',
      ],
    },
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverSrc: bookDefault,
    yearRead: 2022,
    summary: {
      en: 'A sweeping history of humankind from the Stone Age to the present. Harari argues that Homo sapiens came to dominate the world through the unique ability to believe in and cooperate around shared myths — from religion and money to nations and corporations.',
      fr: 'Une histoire de l\'humanité de l\'âge de pierre à nos jours. Harari soutient que l\'Homo sapiens a dominé le monde grâce à la capacité unique de croire et de coopérer autour de mythes partagés.',
    },
    keyPoints: {
      en: [
        'The Cognitive Revolution (~70,000 years ago) gave Sapiens the ability to think in abstractions and create shared myths',
        'Money, nations, and corporations are all shared fictions that enable mass cooperation',
        'The Agricultural Revolution may have been history\'s biggest fraud — improving collective output while worsening individual lives',
        'The Scientific Revolution was unique in acknowledging collective ignorance and pursuing systematic discovery',
        'Happiness has not necessarily increased alongside material progress',
      ],
      fr: [
        'La Révolution cognitive (~70 000 ans) a donné aux Sapiens la capacité de penser en abstractions',
        'L\'argent, les nations et les entreprises sont des fictions partagées permettant la coopération de masse',
        'La Révolution agricole a peut-être amélioré la production collective tout en dégradant les vies individuelles',
        'La Révolution scientifique fut unique en reconnaissant l\'ignorance collective et en poursuivant la découverte systématique',
        'Le bonheur n\'a pas nécessairement augmenté avec le progrès matériel',
      ],
    },
  },
  {
    id: 'the-lean-startup',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    coverSrc: bookDefault,
    yearRead: 2024,
    summary: {
      en: 'Ries presents a methodology for building new businesses and products by treating every launch as an experiment. The core loop of Build–Measure–Learn enables teams to validate assumptions quickly and pivot before wasting resources on ideas that don\'t work.',
      fr: 'Ries présente une méthodologie pour construire des entreprises et des produits en traitant chaque lancement comme une expérience. La boucle Construire–Mesurer–Apprendre permet de valider les hypothèses rapidement.',
    },
    keyPoints: {
      en: [
        'Treat every product decision as a hypothesis to be tested, not a certainty to be executed',
        'The Build–Measure–Learn loop is the core engine of validated learning',
        'A Minimum Viable Product (MVP) tests the most critical assumption with the least effort',
        'Vanity metrics look good on paper but don\'t drive decisions — seek actionable metrics',
        'A pivot is not a failure — it is a disciplined course correction based on validated learning',
      ],
      fr: [
        'Traitez chaque décision produit comme une hypothèse à tester, pas une certitude à exécuter',
        'La boucle Construire–Mesurer–Apprendre est le moteur central de l\'apprentissage validé',
        'Un Produit Minimum Viable (MVP) teste l\'hypothèse la plus critique avec le moins d\'effort',
        'Les métriques de vanité semblent bonnes sur le papier mais ne guident pas les décisions',
        'Un pivot n\'est pas un échec — c\'est une correction de cap disciplinée basée sur l\'apprentissage validé',
      ],
    },
  },
]
