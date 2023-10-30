import React, {useState} from 'react';
import {
  ImageProps,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface FavoritesItemCardProps {
  id: string;
  name: string;
  imagelink_portrait: ImageProps;
  type: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  description: string;
  favorite: boolean;
  ToggleFavoriteItem: any;
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  id,
  name,
  imagelink_portrait,
  type,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  description,
  favorite,
  ToggleFavoriteItem,
}) => {
  // setting the full description on click
  const [fullDescription, setFullDescription] = useState(false);

  return (
    <View style={styles.FavoritesCardContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favorite={favorite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        ToggleFavorite={ToggleFavoriteItem}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientContainer}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        {/* <Text style={styles.DescriptionText}>{description}</Text> */}
        {fullDescription ? (
          <TouchableWithoutFeedback
            onPress={() => setFullDescription(prev => !prev)}>
            <Text style={styles.DescriptionText}>{description}</Text>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => setFullDescription(prev => !prev)}>
            <Text style={styles.DescriptionText} numberOfLines={3}>
              {description}
            </Text>
          </TouchableWithoutFeedback>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  FavoritesCardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },

  LinearGradientContainer: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },

  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },

  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_20,
  },
});

export default FavoritesItemCard;
