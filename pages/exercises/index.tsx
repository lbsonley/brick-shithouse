/* eslint-disable max-len */
import Main from "../../components/layout/main/main";
import Sidebar from "../../components/layout/sidebar/sidebar";
import styles from "./exercises.module.scss";

const Exercises = () => {
  return (
    <>
      <Sidebar>
        <h2 className="heading-1">Sidebar</h2>
      </Sidebar>
      <Main>
        <h1 className="heading-1">Exercises</h1>
        <p>
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
          there live the blind texts. Separated they live in Bookmarksgrove right at the coast
          of the Semantics, a large language ocean. A small river named Duden flows by their
          place and supplies it with the necessary regelialia. It is a paradisematic country,
          in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing
          has no control about the blind texts it is an almost unorthographic life One day however
          a small line of blind text by the name of Lorem Ipsum decided to leave for the far World
          of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad
          Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.
          She packed her seven versalia, put her initial into the belt and made herself on the way.
        </p>
        <h2 className="heading-2">A Heading 2</h2>
        <p>
          The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild
          Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed
          her seven versalia, put her initial into the belt and made herself on the way. When she
          reached the first hills of the Italic Mountains, she had a last view back on the skyline
          of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her
          own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued
          her way. On her way she met a copy. The copy warned the Little Blind Text, that where it
          came from it would have been rewritten a thousand time.
        </p>
        <h3 className="heading-3">A heading 3</h3>
        <p>
          Blind Text should turn around and return to its own, safe country. But nothing the copy
          said could convince her and so it didn’t take long until a few insidious Copy Writers
          ambushed her, made her drunk with Longe and Parole and dragged her into their agency,
          where they abused her for their projects again and again. And if she hasn’t been rewritten,
          then they are still using her.Far far away.
        </p>
      </Main>
    </>
  );
};

export default Exercises;
