'use client'
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

  
export default class NextJsCarousel extends Component {
    render() {
        return (
            <div>
              <h2></h2>
              <Carousel>
                  <div>
                      <img src="https://images.pexels.com/photos/3962287/pexels-photo-3962287.jpeg?cs=srgb&dl=pexels-anna-shvets-3962287.jpg&fm=jpg" alt="image1" />
                      <a href='https://www.linkedin.com/pulse/death-brick-mortar-retail-caused-covid-emery-dittmer/'>
                      <p className="legend"> COVID on Retail</p>
                      </a>
                  </div>
                  
                  <div>
                      <img src="https://media.licdn.com/dms/image/C4D12AQH9DUdk-WYddQ/article-cover_image-shrink_600_2000/0/1647195212134?e=1701907200&v=beta&t=WCIY9SucQw1mqsAwlGuSc50jxGzXhCaWkF2ydUjNLpw" alt="image2" />
                      <a href='https://www.linkedin.com/pulse/note-physical-location-workers-effect-retention-emery-dittmer/'>
                      <p className="legend"> Physical Worker Location</p>
                      </a>
  
                  </div>

              </Carousel>
            </div>
        );
    }
};