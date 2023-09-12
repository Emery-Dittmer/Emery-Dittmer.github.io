import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
      heading: 'Roboto-Header',
      body: 'Roboto Body',
    }
    // components: { 
    //   Button: { baseStyle: { _focus: { boxShadow: 'none' } } }

    // }
})

export default theme