import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import pencil from '../../files/icons/pencil-book.png';
import person from '../../files/icons/person.png';
import styles from './Home.module.css'; // Import the CSS module with a variable name (e.g., 'styles')
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className={styles['web-page']}> {/* Use the CSS module class names */}
      <Container>
        {/* The Container without the 'fluid' prop makes it fixed-width */}
        <Row className={styles['banner-row']}>
          <Col>
            <h1 className={styles['banner-quote']}>Education is the manifestation of the perfection  already in man</h1>
            <p className={styles['banner-author']}>- Swami Vivekananda</p>
          </Col>
        </Row>
        <Row className={styles['content-row']}>
          <Col md={4} className={styles['left-col']}>
            <img src={pencil} alt="Pencil and book" className={styles['pencil-book']}  />
          </Col>
          <Col md={4} className={styles['center-col']} >
          <p className={styles['content-text']}>Welcome to Medhavi.At Medhavi,we emphasize on quality education.At presenttime education is the key to turn your dreams into reality.<br/> <br/>  A premium coaching institute founded by individuals from IIT Roorkee and other teachers with more than 14 years of teaching experience.</p>

          </Col>
          <Col md={4} className={styles['right-col']}>
            <img src={person} alt="Person" className={styles['person']}/>
            
          </Col>
        </Row>
      </Container>
      <footer className=" text-black  py-2">
        <Container>
          <Row>
          <div className={styles['bold-line']}></div>
            <Col>
              
            <p className={styles['text-bold' ]}>Syllabus bhi Selection bhi</p>
            </Col>
            {/* <Col>
              
            <p className={styles['text-bold']}>Selection bhi </p>
            </Col> */}
          </Row>
        </Container>
      </footer>
    </div>
    
  );
}

export default Home;
