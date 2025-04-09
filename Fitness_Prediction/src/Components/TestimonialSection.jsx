import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; 
import './style.css';

const testimonials = [
  {
    name: 'Jancy',
    title: 'CEO',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of',
    rating: 4
  },
  {
    name: 'Peterson',
    title: 'Finance Manager',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    feedback: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of',
    rating: 4
  },
  {
    name: 'Kane Williamson',
    title: 'Manager',
    image: 'https://randomuser.me/api/portraits/men/60.jpg',
    feedback: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of',
    rating: 5
  }
];

const TestimonialSection = () => {
  return (
    <div className="testimonial-section py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Our Happy Clients</h2>
        <div className="text-primary testimonial-sub">— testimonials —</div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {testimonials.map((t, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="testimonial-card p-4 position-relative shadow-sm bg-white text-center rounded">
                <div className="quote-icon">❝</div>
                <img src={t.image} className="rounded-circle mb-3" width="70" height="70" alt={t.name} />
                <h5 className="mb-0">{t.name}</h5>
                <small className="text-muted">{t.title}</small>
                <p className="fst-italic mt-3">{t.feedback}</p>
                <div className="star-rating text-warning">
                  {'★'.repeat(t.rating)}
                  {'☆'.repeat(5 - t.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
