import React from 'react'
import { View, StyleSheet, Dimensions} from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'


const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];

  return (
    <View>
        <Carousel
              layout="stack"
              layoutCardOffset={0}
              ref={isCarousel}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
              style= {styles.container}
        />
        <Pagination
              dotsLength={data.length}
              activeDotIndex={index}
             
              dotStyle={styles.dot}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default CarouselCards