import {
  AboutPageContainer,
  ProjectsContainer,
  CardsContainer,
} from '#/components/about/Containers';
import RecentProjects from '#/components/about/RecentProjects';
import Me from '#/components/about/Me';

import { Cards, Card } from '#/components/about/Cards';

import { cardData } from '#/data/data';

export default function About() {
  return (
    <AboutPageContainer>
      <Me />
      <ProjectsContainer>
        <RecentProjects />
        <CardsContainer>
          <Cards
            cards={cardData}
            renderCard={({
              color,
              tech,
              desc,
              pic,
              showTooltip,
              stopShowingTooltips,
              proj,
              company,
              isLast,
              initialMargin,
            }) => (
              <Card
                key={proj}
                color={color}
                tech={tech}
                showTooltip={showTooltip}
                stopShowingTooltips={stopShowingTooltips}
                company={company}
                desc={desc}
                pic={pic}
                proj={proj}
                initialMargin={initialMargin}
                isLast={isLast}
              />
            )}
          />
        </CardsContainer>
      </ProjectsContainer>
    </AboutPageContainer>
  );
}
