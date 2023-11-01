import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistory = () => {
  // getting order history list from store.ts
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);

  // tab bar height
  const tabBarHeight = useBottomTabBarHeight();

  // lottie state variable
  const [showAnimation, setShowAnimation] = useState(false);

  console.log('Order History =', OrderHistoryList.length);

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
                    CartItems={data.CartItems}
                    CartListPrice={data.CartListPrice}
                    navigationHandler={() => {}}
                  />
                ))}
              </View>
            )}
          </View>
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
});

export default OrderHistory;
