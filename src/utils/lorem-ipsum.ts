function generateLoremIpsumString(characters: number) {
  // Lorem ipsum sentences for randomness
  const loremStarter = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const loremPool = [
    'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.',
    'Aenean lacinia bibendum nulla sed consectetur.',
    'Cras mattis consectetur purus sit amet fermentum.',
    'Donec ullamcorper nulla non metus auctor fringilla.',
    'Nulla vitae elit libero, a pharetra augue.',
    'Curabitur blandit tempus porttitor.',
    'Etiam porta sem malesuada magna mollis euismod.',
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    'Maecenas faucibus mollis interdum.',
    'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
    'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
    'Sed posuere consectetur est at lobortis.',
    'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    'Nullam quis risus eget urna mollis ornare vel eu leo.',
    'Nullam id dolor id nibh ultricies vehicula ut id elit.',
    'Donec id elit non mi porta gravida at eget metus.',
    'Facilisis at vero eros et accumsan et iusto odio dignissim qui blandit.',
    'Praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
    'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet.',
    'Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.',
    'Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.',
    'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.',
    'Mirum est notare quam littera gothica, quam nunc putamus parum claram.',
    'Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.',
  ];

  // Shuffle array (Fisher-Yates Shuffle)
  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Generate random Lorem Ipsum text
  function randomLoremIpsum(length: number): string {
    shuffle(loremPool); // Randomize the order of sentences
    let result = loremStarter + ' ' + loremPool.join(' '); // Start with all sentences joined
    result = result.repeat(Math.ceil(length / result.length)); // Repeat to ensure enough length

    // Truncate to the exact number of characters required
    return result.substring(0, length);
  }

  return randomLoremIpsum(characters);
}

function splitTextIntoParagraphs(text: string, numberOfParagraphs: number): string[] {
  if (numberOfParagraphs <= 0) {
    return [text];
  }
  const sentences = text.match(/[^.!?]+[.!?]\s*/g) || [];
  if (sentences.length < numberOfParagraphs) {
    return [text];
  }

  // Calculate approximate number of sentences per paragraph
  let paragraphs: string[] = new Array(numberOfParagraphs).fill('');
  let paragraphIndex = 0;

  // Distribute sentences among the paragraphs
  sentences.forEach((sentence, index) => {
    paragraphs[paragraphIndex] += sentence;
    // Move to the next paragraph index if it's not the last one
    if (paragraphIndex < numberOfParagraphs - 1) {
      // Calculate if it's time to move to the next paragraph
      const sentencesPerParagraph = Math.ceil((sentences.length - index) / (numberOfParagraphs - paragraphIndex));
      if ((index + 1) % sentencesPerParagraph === 0) {
        paragraphIndex++;
      }
    }
  });

  return paragraphs.filter(paragraph => paragraph.length > 0); // Filter out any empty paragraphs
}

export function generateLoremIpsum({
  paragraphs,
  characters,
  errorMessage = 'Could not generate lorem ipsum',
}: {
  paragraphs: number;
  characters: number;
  errorMessage?: string;
}): string {
  // Lorem ipsum sentences for randomness
  const loremText = generateLoremIpsumString(characters);
  // try to break text into equal length paragraphs, only split on periods
  const paragraphsArray = splitTextIntoParagraphs(loremText, paragraphs);
  return paragraphsArray.join('\n\n');
}
