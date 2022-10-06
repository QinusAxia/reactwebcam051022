import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import _ from 'lodash'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
import zIndex from '@material-ui/core/styles/zIndex'

export default function Home() {

  const [currentImage, setcurrentImage] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState({
    width: null,
    height: null,
  })

  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT)
  const videoConstraints = {
    width: windowDimensions.width,
    height: windowDimensions.height * 0.7,
    facingMode: facingMode,
  }

  useEffect(() => {
    setWindowDimensions({ height: window.innerHeight, width: window.innerWidth })
    function handleResize() {
      setWindowDimensions({ height: window.innerHeight, width: window.innerWidth });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  useEffect(() => {
    console.log(windowDimensions)
    // setVideoConstraints({
    //   width: windowDimensions.width,
    //   height: windowDimensions.height * 0.7,
    //   facingMode: facingMode,
    // })
  }, [windowDimensions])


  const savePictureState = (jpegImg) => {
    // const image = URL.createObjectURL(jpegImg)
    // var binaryData = [];
    // binaryData.push(jpegImg);
    // const image = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
    // console.log(image)
    setcurrentImage(jpegImg)
  }

  const handleSwitch = () => {
    facingMode === FACING_MODE_USER ?
      setFacingMode(FACING_MODE_ENVIRONMENT) : setFacingMode(FACING_MODE_USER)
    console.log('swith')
  }

  if (!_.isNil(windowDimensions.width)) {
    return (
      <Box>
        <AppBar position='static'>
          <Toolbar>
            <Box> w:{videoConstraints.width}, h:{videoConstraints.height} </Box>
          </Toolbar>
        </AppBar>
        {
          _.isNull(currentImage) && !_.isNil(window) ?
            <Box style={{
              maxWidth: windowDimensions.width,
              // overflow:'hidden'
            }}>
              <Box style={{
                position: 'absolute',
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                zIndex: 10
              }}
              >
                <Button
                  startIcon={<SwitchCameraIcon />}
                  size='large'
                  variant='contained'
                  onClick={() => handleSwitch()}
                >
                  Switch
                </Button>
              </Box>
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                // mirrored={true}
                // style={{ maxWidth: windowDimensions.width }}
              >
                {({ getScreenshot }) => (
                  <Box style={{ marginTop: 0 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      size='large'
                      fullWidth
                      onClick={() => {
                        const imageSrc = getScreenshot({
                          width: windowDimensions.width,
                          height: windowDimensions.height * 0.7
                        })
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
  } else {
    return (
      <Box>
        Loading
      </Box>
    )
  }


}
