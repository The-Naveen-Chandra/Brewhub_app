import React from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderItemCard from './OrderItemCard';

interface OrderHistoryCardProps {
  OrderDate: string;
  CartList: any;
  CartListPrice: string;
  navigationHandler: any;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  OrderDate,
  CartList,
  CartListPrice,
  navigationHandler,
}) => {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View style={styles.OrderDateContainer}>
          <Text style={styles.HeaderTitle}>Order time</Text>
          <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
        </View>
        <View style={styles.TotalPriceContainer}>
          <Text style={styles.HeaderTitle}>Total amount</Text>
          <Text
            style={[
              styles.HeaderSubtitle,
              {
                color: COLORS.primaryOrangeHex,
                fontFamily: FONTFAMILY.poppins_medium,
                fontSize: FONTSIZE.size_18,
              },
            ]}>
            $ {CartListPrice}
          </Text>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {CartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}>
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              ItemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    gap: SPACING.space_10,
  },

  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_20,
  },

  OrderDateContainer: {
    alignItems: 'flex-start',
  },

  TotalPriceContainer: {
    alignItems: 'flex-end',
  },

  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },

  HeaderSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },

  ListContainer: {
    gap: SPACING.space_20,
  },
});

export default OrderHistoryCard;
