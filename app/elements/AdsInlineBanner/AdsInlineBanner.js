import { useEffect, useMemo, useState } from "react";
import { Dimensions } from "react-native";
import { AdRequest, AdTheme, BannerAdSize, BannerView } from "yandex-mobile-ads";

const AdsInlineBanner = () => {
  const adRequest = useMemo(() => new AdRequest({
    adTheme: AdTheme.Light,
  }), []);
  const [ adSize, setAdSize ] = useState();
  useEffect(() => {
    (async () => {
      setAdSize(await BannerAdSize.inlineSize(Dimensions.get('window').width - 4, 200));
    })();
  }, []);

  return adSize
    ? (
      <BannerView
          size={adSize}
          adUnitId={'R-M-16551059-1'}
          adRequest={adRequest}
      />
    )
    : null; 
};

export default AdsInlineBanner;
