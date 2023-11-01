import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistory = ({navigation}: any) => {
  // getting order history list from store.ts
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);

  // tab bar height
  const tabBarHeight = useBottomTabBarHeight();

  // lottie state variable
  const [showAnimation, setShowAnimation] = useState(false);

  // Navigation handler function
  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  // button press handler function
  const buttonPressHandler = () => {
    // set show animation to true
    setShowAnimation(true);

    // set timeout for 2 seconds
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {/* Conditionally rendering lottie animation */}
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title={'Order History'} />

            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No order history.'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    OrderDate={data.OrderDate}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    navigationHandler={navigationHandler}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={styles.DownloadButtonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },

  // Lottie Animation
  LottieAnimation: {
    height: 250,
  },

  ScrollViewFlex: {
    flexGrow: 1,
  },

  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },

  ItemContainer: {
    flex: 1,
  },

  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },

  DownloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_32 * 2,
    borderRadius: BORDERRADIUS.radius_25,
  },

  DownloadButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});

export default OrderHistory;
