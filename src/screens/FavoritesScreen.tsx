import React from 'react';
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
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CartItem from './CartItem';
import PaymentFooter from '../components/PaymentFooter';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoritesScreen = ({navigation, route}: any) => {
  // Calculating Tab bar height
  const tabBarHeight = useBottomTabBarHeight();

  // Getting the data form store.ts
  const FavoritesList = useStore((state: any) => state.FavoritesList);

  // add to favorite function calling
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);

  // delete from favorite function calling
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  // Toggling the favorite list
  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />
            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No favorites.'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      name={data.name}
                      imagelink_portrait={data.imagelink_square}
                      type={data.type}
                      special_ingredient={data.special_ingredient}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favorite={data.favorite}
                      ToggleFavoriteItem={ToggleFavorite}
                    />
                  </TouchableOpacity>
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
    gap: SPACING.space_20,
  },
});

export default FavoritesScreen;
