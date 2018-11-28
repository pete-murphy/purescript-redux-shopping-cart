module Format where

import Prelude

import Data.Maybe
import Data.Foldable (fold, intercalate)

format :: String -> Number -> Maybe Int -> String
format s n i = s <> " " <> show n <> x
  where 
    x = case fromMaybe 0 i of
      0 -> mempty
      x -> " " <> show x