import Slider from 'react-slick';
import { Box } from '@mui/material';

const ImageCarousel = ({ car, height }) => {
    const settings = {
        dots: true,
        infinite: car?.images?.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <Box sx={{ mb: 5, bgcolor: "white" }}>
            <Slider {...settings}>
                {car?.images?.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '100%',
                            height: height || { xs: 200, sm: 220, md: 190, lg: 250 },           // fixed height for all images (adjust as needed)
                            overflow: 'hidden',    // hides overflow caused by cropping
                            borderRadius: '8px',
                        }}
                    >
                        <img
                            src={image.url}
                            alt={`${car?.model} - ${index + 1}`}
                            loading='lazy'
                            style={{
                                width: '100%',
                                height: '100%',       // fill the container height
                                objectFit: 'cover',  // cover crop to fill box without distortion
                                display: 'block',    // remove bottom gap in images
                            }}
                        />
                    </Box>
                ))}
            </Slider>

        </Box>
    );
};

export default ImageCarousel;
