import {
  AboutPageContainer,
  CardsContainer,
} from '#/components/about/Containers';
import RecentProjects from '#/components/about/RecentProjects';
import { Cards, Card } from '#/components/about/Cards';

import { cardData } from '#/data/data';

export default function About() {
  return (
    <AboutPageContainer>
      <RecentProjects />
      <CardsContainer>
        <Cards
          cards={cardData}
          renderCard={({ color, desc, pic, proj, isLast, initialMargin }) => (
            <Card
              key={proj}
              color={color}
              desc={desc}
              pic={pic}
              proj={proj}
              initialMargin={initialMargin}
              isLast={isLast}
            />
          )}
        />
      </CardsContainer>
    </AboutPageContainer>
  );
}
