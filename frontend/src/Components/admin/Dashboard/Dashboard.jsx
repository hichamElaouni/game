

import "./Dashboard.css"

import ScrollToTop from '../../Setings/ScrollToTop';
import Slides from './Slides';
import TopRooms from './TopRooms';
import Services from './Services';
import Prices from './Prices';
import About from './About';
import Contacts from "./Contacts";
export default function Dashboard({ refs }) {


  const Sections = () => {
    const sections = [<Slides />, <TopRooms />, <Services />, <Prices />, <About />, <Contacts />];

    return (
      sections.map((section, i) =>
        <section key={i} className='sections' ref={refs[i]}>
          {section}
        </section>

      )
    )
  }

  return (
    <>

      <div className='dashboard' >
        {
          Sections()
        }

        <ScrollToTop />
      </div>

    </>
  )
}

