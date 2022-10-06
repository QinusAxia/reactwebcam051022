import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import _ from 'lodash'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';

export default function Home() {

  const [currentImage, setcurrentImage] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState({ height: 720, width: 1280 })

  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT)
  const videoConstraints = {
    width: windowDimensions.width,
    height: windowDimensions.height * 0.7,
    facingMode: facingMode,
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

  const handleSwitch = useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Box component={Typography}> CSV BOX TEST </Box>
        </Toolbar>
      </AppBar>
      {
        _.isNull(currentImage) ?
          <Box style={{ maxWidth: windowDimensions.width }}>
            <Box style={{
              position: 'absolute',
              padding: 2,
              display: 'flex',
              width: '100%',
              justifyContent: 'center'
            }}
            >
              <Button
                startIcon={<SwitchCameraIcon />}
                size='small'
                variant='contained'
                onClick={handleSwitch}
              >
                switch
              </Button>
            </Box>
            <Webcam
              height={windowDimensions.height * 0.7}
              audio={false}
              screenshotFormat="image/jpeg"
              reversed={true}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <Box style={{ marginTop: 0 }}>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
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

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <img src={currentImage} alt={'current picture'} />
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
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
          </Box>
      }
    </Box>
  )
}
