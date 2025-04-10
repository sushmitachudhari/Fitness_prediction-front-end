import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';

// const cardData = [
//   {
//     title: "Progression",
//     desc: "Fitness includes a comprehensive diet, activity intervention programs, and lifestyle modification.",
//     icon: "fas fa-stopwatch",
//     bgImage: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1" // Replace with your image URL
//   },
//   {
//     title: "Workout",
//     desc: "Get fitter and stronger with us. Push yourself harder to become better. Keep calm & gym with us.",
//     icon: "fas fa-dumbbell",
//     bgImage: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1" // Replace with your image URL
//   },
//   {
//     title: "Nutrition",
//     desc: "Cover your plate with fruits and vegetables. Nutrition food helps to maintain a healthy body weight.",
//     icon: "fas fa-clipboard-list",
//     bgImage: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1" // Replace with your image URL
//   }
// ];

const FeatureCards = () => {
  return (
    <div className="container  mt-3  p-2 fc" >
      {/* <div className="row">
        {cardData.map((card, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="feature-card text-white text-center p-4"
              style={{ backgroundImage: `url(${card.bgImage})` }}
            >
              <div className="overlay"></div>
              <div className="card-content position-relative">
                <i className={`${card.icon} feature-icon mb-3`}></i>
                <h4 className="fw-bold">{card.title}</h4>
                <p className="mb-4">{card.desc}</p>
                <button className="btn btn-danger px-4 fw-semibold">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div> */}


     <center><h3 className='p-2'>🌟 Your Fitness, Your Way</h3>
     <p>
     Welcome to the Personalized Fitness Prediction System – your smart fitness partner. Our platform uses advanced machine learning algorithms to provide customized workout suggestions, accurate calorie burn predictions, and progress tracking based on your personal fitness data. Whether you're just starting your journey or looking to level up your routine, our system adapts to your unique goals and body metrics to help you stay on track, motivated, and healthier every day.
     </p>
</center>
    </div>
  );
};

export default FeatureCards;
