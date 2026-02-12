import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../BaseView';
import {
  COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  SCREEN_HEIGHT,
} from '../../../utils/constants';
import Search from '../../../assets/svgs/searchh.svg';
import ImagePick from '../../../assets/svgs/imagepicker.svg';
import CloseIcon from '../../../assets/svgs/closeicon.svg';
import ImagePicker from 'react-native-image-crop-picker';
import SearchCat from '../../../assets/svgs/searchcat.svg';
import {getCatSearch, getPolling} from '../../../services/actions/AppApi';
import Loader from '../../../components/Loader';
import CatFishComponent from '../../../components/CatFishComponent';

export default function CatfishSearch() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pollingRef = useRef(null);

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: false,
      includeBase64: true,
    }).then(image => {
      console.log('selected image', image);
      const selected = {
        path: image.path,
        data: image.data,
      };

      setSelectedImage(selected);
      handleSearch(selected);
    });
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  console.log('selecteeee', selectedImage);
  const handleSearch = async (e, imageData = selectedImage) => {
    console.log('imagedata', imageData);
    try {
      setLoading(true);
      const data = {
        image: imageData.data,
      };
      const response = await getCatSearch(data);
      console.log('responsefromcatsearch', response);

      if (response?.taskId) {
        startPolling(response.taskId);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error('Error in handleSearch:', err);
      setLoading(false);
    }
  };

  const startPolling = taskId => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    pollingRef.current = setInterval(async () => {
      try {
        const statusResponse = await getPolling(taskId);
        console.log('Polling response:', statusResponse);

        if (
          statusResponse.status === 'completed' ||
          statusResponse.status === 'failed'
        ) {
          console.log('Final Result:', statusResponse);
          if (statusResponse?.result?.message === 'No match found') setData([]);
          else
            setData([
              {id: 1, name: 'Fake Catfish 1'},
              {id: 2, name: 'Fake Catfish 2'},
              {id: 3, name: 'Fake Catfish 3'},
            ]);
          clearPolling();
        }
      } catch (err) {
        console.error('Polling error:', err);
        clearPolling();
      }
    }, 3000);
  };

  const clearPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      clearPolling();
    };
  }, []);

  const renderItem = () => (
    <View>
      <CatFishComponent />
    </View>
  );

  return (
    <BaseView
      safeView={{backgroundColor: COLORS.white}}
      topView={{flex: 0, backgroundColor: COLORS.white}}
      baseViewStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
      }}>
      <View style={styles.mainView}>
        <Text style={styles.catfish}>Search for Catfishing</Text>
        <View style={styles.searchButton}>
          <View style={styles.searchView}>
            {!selectedImage ? (
              <TextInput
                style={styles.input}
                placeholder={'Phone No. or Email'}
                returnKeyType="search"
                onSubmitEditing={event => {
                  const value = event.nativeEvent.text;
                  console.log('Searching for:', value);
                }}
                placeholderTextColor={COLORS.border}
              />
            ) : (
              <View style={styles.imageWrapper}>
                <Image
                  source={{uri: selectedImage.path}}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={handleRemoveImage}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={handleImage}>
              <ImagePick />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleSearch}>
            <SearchCat />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          {data?.length > 0 && (
            <Text style={styles.catfishText}>Catfishing Results</Text>
          )}
          <FlatList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlistScroll2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading && (
                <View style={{marginTop: SCREEN_HEIGHT * 0.3}}>
                  <Text style={styles.match}>No Match Found!</Text>
                </View>
              )
            }
          />
        </View>
      </View>
      {loading && <Loader />}
    </BaseView>
  );
}

const styles = StyleSheet.create({
  catfish: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.twenty,
    textAlign: 'center',
    marginBottom: 18,
  },
  mainView: {
    flex: 1,
    marginTop: 10,
  },
  searchView: {
    backgroundColor: COLORS.lightGray,
    height: 62,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
  },
  imageWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 2,
    elevation: 3,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  match: {
    color: COLORS.black,
    fontFamily: FONT_FAMILIES.bold,
    fontSize: FONT_SIZES.twenty,
    textAlign: 'center',
  },
});
