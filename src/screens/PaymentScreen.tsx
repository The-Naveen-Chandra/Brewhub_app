import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import {useStore} from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation, route}: any) => {
  // setting payment mode
  const [paymentMode, setPaymentMode] = useState('Credit Card');

  // lottie state variable
  const [showAnimation, setShowAnimation] = useState(false);

  // calculate cart price function calling
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  // add to order history list from cart function calling
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );

  // button Handler function
  const buttonHandler = () => {
    setShowAnimation(true);

    // add to the order history list from cart
    addToOrderHistoryListFromCart();

    // calculate cart price
    calculateCartPrice();

    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {/* Conditionally rendering lottie animation */}
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name={'left'}
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.PaymentOptionsContainer}>
          {/* Credit Card */}
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBackground}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.LinearGradientCreditCard}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon
                      name={'chip'}
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name={'visa'}
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumberText}>3879</Text>
                    <Text style={styles.CreditCardNumberText}>5489</Text>
                    <Text style={styles.CreditCardNumberText}>9084</Text>
                    <Text style={styles.CreditCardNumberText}>5566</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Naveen Chandra
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>

          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonHandler={buttonHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },

  // Lottie Animation Styles
  LottieAnimation: {
    flex: 1,
  },

  ScrollViewFlex: {
    flexGrow: 1,
  },

  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },

  EmptyView: {
    height: SPACING.space_24,
    width: SPACING.space_24,
  },

  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },

  // Credit Card Styles
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },

  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },

  CreditCardBackground: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },

  LinearGradientCreditCard: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },

  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },

  CreditCardNumberText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },

  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },

  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },

  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },

  CreditCardNameSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default PaymentScreen;
