import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

export default function Home() {

  const [currentImage, setcurrentImage] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState({ height: 720, width: 1280 })
  const videoConstraints = {
    width: windowDimensions.width,
    height: windowDimensions.height * 0.7,
    facingMode: "user"
  };

  useEffect(() => {
    setWindowDimensions({ height: window.innerHeight, width: window.innerWidth })
    function handleResize() {
      setWindowDimensions({ height: window.innerHeight, width: window.innerWidth });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const savePictureState = (jpegImg) => {
    // const image = URL.createObjectURL(jpegImg)
    // var binaryData = [];
    // binaryData.push(jpegImg);
    // const image = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
    // console.log(image)
    setcurrentImage(jpegImg)
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Box component={Typography}> CSV BOX TEST </Box>
        </Toolbar>
      </AppBar>
      {
        _.isNull(currentImage) ?
          <Box>
            <Webcam
              height={windowDimensions.height * 0.7}
              audio={false}
              screenshotFormat="image/jpeg"
              reversed={true}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <Box display='flex' justifyContent={'center'} alignItems="center">
                  <Button
                    variant='contained'
                    size='large'
                    onClick={() => {
                      const imageSrc = getScreenshot()
                      savePictureState(imageSrc)
                    }}
                  >
                    Capture photo
                  </Button>
                </Box>
              )}
            </Webcam>
          </Box>

          :

          <Box display={'flex'} flexDirection='column' alignItems='center'>
            <Box mb={2}>
              <img src={currentImage} alt={'current picture'} />
            </Box>
            <Button
              variant='outlined'
              color='secondary'
              size='large'
              onClick={() => {
                setcurrentImage(null)
              }}
            >
              Retake picture
            </Button>
          </Box>
      }
    </Box>
  )
}
