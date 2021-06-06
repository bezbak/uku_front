import React from "react";
import styles from './styles.module.scss'
import Collapse from "../Collapse";

const questionsAnswers = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt. `,
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt.`,
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt aliquam enim risus. Est viverra nunc feugiat ullamcorper. Justo praesent integer elementum tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac scelerisque orci aliquam consectetur tristique nec. Potenti eu tellus ut odio. Ut a sed ultricies luctus massa faucibus. Cum ornare odio mauris, faucibus consequat tincidunt .`,
  },
];
const FAQ = () => {
  return (
    <div className={styles.faq}>
      <div className={styles.faq__headline}>
        <span>
          F.A.Q.
        </span>
      </div>
      <ul className={styles.sectionOurAreasOfLegalExpertise__areas__list}>
        {questionsAnswers.map((item, index) => {
          return (
            <Collapse
              key={index}
              title={item.question}
              content={item.answer}
              containerClassName={styles.sectionOurAreasOfLegalExpertise__areas__item__visible}
              titleClassName={styles.sectionOurAreasOfLegalExpertise__areas__item__title}
              descriptionClassName={styles.sectionOurAreasOfLegalExpertise__areas__item__description}
            />
          )
        })}
      </ul>
    </div>
  )
}
export default FAQ;