export interface Publication {
  date: string;
  title: string;
  link: string;
  description: string;
  journal: string;
  doi?: string;
}

export const publications: Publication[] = [
  {
    date: '2025',
    title: 'Optimising machine learning integration in real-time text analytics platforms: Technical approaches and performance criteria',
    link: 'https://journals.rcsi.science/2328-1391/article/view/298756',
    description: 'Background. Modern maritime transportation faces challenges related to the need for increased energy efficiency and reduced greenhouse gas emissions. These issues have become particularly relevant in the context of global environmental policies and the tightening of international ship energy efficiency standards (EEDI, EEOI, CII). One of the promising solutions is the use of geographic information systems (GIS), which enable vessel route optimization, reduce fuel consumption, and minimize environmental impact. However, the extent of their impact on improving maritime transport energy efficiency requires further research.',
    journal: 'International Journal of Advanced Studies, Volume 15, Issue 1',
    doi: 'https://doi.org/10.12731/2227-930X-2025-15-1-350',
  },
  {
    date: '2025',
    title: 'Spatial Indexing in Games and Geospatial Applications',
    link: 'https://medium.com/gitconnected/spatial-indexing-in-games-and-geospatial-applications-f351d461cd62',
    description: 'Ditch the lag and unlock lightning-fast spatial queries. This in-depth guide breaks down the essential spatial indexing techniques that power high-performance video games and massive geospatial applications (GIS). We dive into the principles, structures, and trade-offs of Quadtrees, Octrees, HyperOctrees, and K-D Trees, explaining how they transform O(N) searches into near O(logN) performance. Learn how to choose the right index to significantly accelerate collision detection, culling, and nearest-neighbor searches in your own projects.',
    journal: 'Medium (GitConnected)',
  },
  {
    date: '2025',
    title: 'Methods of Performance Optimisation in Distributed Systems with High Load: State of the Art and Prospects',
    link: 'https://visnikkrnu.kdu.edu.ua/statti/2025_1_152.pdf',
    description: 'The study aims to analyse modern optimisation methods, identify the main problems and limitations of existing solutions, and develop recommendations for implementing innovative approaches to improve the performance and reliability of distributed systems. A systematic analysis of scientific publications was carried out as part of the work to identify key approaches to optimising the performance of distributed systems with high load. A comparative analysis of existing methods, including load balancing, caching, and scaling, was carried out. A survey methodology was used to identify the main problems and limitations, as well as to analyse the practical aspects of implementing modern technologies, in particular artificial intelligence and hybrid models, in real-world operating conditions. It is established that traditional methods, although providing basic stability of systems, do not take into account the dynamism of modern digital environments, which limits their adaptability and scalability.',
    journal: 'Вісник КрНУ імені Михайла Остроградського. Випуск 1 / 2025 (150)',
    doi: 'https://doi.org/10.32782/1995-0519.2025.1.20',
  },
  {
    date: '2025',
    title: 'Optimising machine learning integration in real-time text analytics platforms: Technical approaches and performance criteria',
    link: 'https://doi.org/10.36910/6775-2524-0560-2025-58-05',
    description: 'The article investigates the integration of machine learning into real-time platforms for analysing text streams. The relevance of the topic is driven by the growing volume of unstructured textual data and the need for its prompt and accurate processing to support decision-making in such fields as media monitoring, cybersecurity, finance, and healthcare. The effectiveness of such platforms is shown to depend on the adaptability of algorithms, analysis accuracy, scalability, and transparency of results. Special attention is paid to the technical aspects of implementation, including distributed architecture, streaming data processing, optimisation of computing resources, and integration of explainable models. The purpose of the article is to study the possibilities of integrating machine learning algorithms into real-time platforms for analysing text streams, in particular, to develop approaches to improving the efficiency of data processing, ensuring their transparency and adaptability in a changing information environment. To achieve this goal, the study applies a combination of literature analysis, comparative evaluation of existing algorithms, and an experimental assessment of technical solutions.',
    journal: 'Computer-Integrated Technologies, Issue 58',
    doi: 'https://doi.org/10.36910/6775-2524-0560-2025-58-05',
  },
  {
    date: '2025',
    title: 'Pathfinding in Games and Geospatial Applications',
    link: 'https://medium.com/gitconnected/pathfinding-in-games-and-geospatial-applications-5e63ee18764b',
    description: 'Why A* isn\'t enough for pathfinding in modern game engines and maps—a comparison of core algorithms. Routing across millions of road segments or managing hundreds of real-time NPC pathfinding requests requires more than just textbook solutions. This deep dive moves beyond Dijkstra\'s and A* to explore the advanced algorithms that make real-world navigation and gaming possible. We break down powerful techniques like Contraction Hierarchies (CH), Jump Point Search (JPS), Bidirectional Search, and Customizable Route Planning (CRP), showing you how they drastically reduce search space and deliver millisecond-fast results on the largest graphs.',
    journal: 'Medium (GitConnected)',
  },
  {
    date: '2024',
    title: 'Analysis of AI effectiveness in reducing human errors in processing transportation requests',
    link: 'https://arxiv.org/pdf/2503.15517',
    description: 'This article examines the characteristics of human errors in processing transportation requests. The role of artificial intelligence (AI) in maritime transportation is explored. The main methods and technologies used for automating and optimizing the handling of transportation requests are analyzed, along with their impact on reducing the number of errors. Examples of successful AI implementation in large companies are provided, confirming the positive influence of these technologies on overall operational efficiency and customer service levels.',
    journal: 'German International Journal of Modern Science, № 88',
    doi: 'https://doi.org/10.5281/zenodo.13786097'
  },
  {
    date: '2024',
    title: 'Application of NLP technologies for data extraction from text messages in maritime logistics',
    link: 'https://www.scientific-heritage.com/wp-content/uploads/2024/07/The-scientific-heritage-No-141-141-2024.pdf#page=42',
    description: 'The article examines modern methods of integrating Natural Language Processing (NLP) technologies into the logistics sector: text preprocessing, named entity recognition, sentiment analysis, classification and clustering, and deep learning models. Their role in enhancing efficiency and accuracy of data extraction from textual messages is highlighted. Various NLP techniques and tools, their application in maritime logistics, as well as the challenges and limitations in their implementation are analyzed.',
    journal: 'The Scientific Heritage (Budapest, Hungary) № 141',
    doi: 'https://doi.org/10.5281/zenodo.12908100'
  },
];
