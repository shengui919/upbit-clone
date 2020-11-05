import React from "react";
import styled from "styled-components";
import withCoinInfoData from "../Container/withCoinInfoData";
import withSelectedCoinName from "../Container/withSelectedCoinName";
import withSelectedCoinPrice from "../Container/withSelectedCoinPrice";
import withThemeData from "../Container/withThemeData";

const St = {
  CoinInfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: white;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
  `,

  CoinInfoMain: styled.div`
    display: flex;
    align-items: center;
    min-width: 380px;
  `,

  CoinLogo: styled.i`
    display: inline-block;
    width: 35px;
    height: 35px;
    background-image: ${({ coinSymbol }) =>
      `url(https://static.upbit.com/logos/${coinSymbol}.png)`};
    background-size: cover;
    margin-left: 5px;
  `,

  CoinNameContainer: styled.div`
    padding: 0 8px 0 13px;
  `,

  CoinName: styled.strong`
    font-size: 1.7rem;
    font-weight: 1500;
    color: #2b2b2b;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 1.5rem;
    }
  `,

  CoinMarketName: styled.span`
    display: flex;
    font-size: 0.9rem;
    flex-direction: column;
    padding-left: 5px;
    margin-top: 7px;
  `,

  PriceInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Price: styled.strong`
    color: ${({ priceColor }) => priceColor};
    font-size: 2rem;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 1.5rem;
    }
  `,

  PriceUnit: styled.span`
    font-size: 0.9rem;
    font-weight: 500;
    padding-left: 5px;
  `,

  ChangeContainer: styled.span`
    font-size: 0.8rem;
    margin-top: 5px;
  `,

  ChangeRate: styled.strong`
    font-size: 1rem;
    color: ${({ priceColor }) => priceColor};
    margin: 0 10px 0 5px;
  `,

  ChangePrice: styled.strong`
    font-size: 1rem;
    color: ${({ priceColor }) => priceColor};
  `,

  TradeInfoContainer: styled.dl`
    display: flex;
    justify-content: flex-end;
    width: 45%;
    height: 100%;
    margin: 0 10px 0 0;

    @media ${({ theme, mobileMNone }) => (mobileMNone ? theme.mobileM : true)} {
      display: none;
    }
  `,

  InfoContainer: styled.div`
    height: 50%;
    margin-left: 15px;
    @media ${({ theme, tabletNone }) => (tabletNone ? theme.tablet : true)} {
      display: none;
    }
    @media ${({ theme, mobileMNone }) => (mobileMNone ? theme.mobileM : true)} {
      display: none;
    }
  `,

  TradeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    height: 50%;
    min-width: ${({ minWidth }) => minWidth || "none"};
    border-bottom: 1px solid ${({ borderColor }) => borderColor || "none"};
    padding: 5px 0 5px 0;
    font-size: 0.8rem;
  `,

  TradeDT: styled.dt`
    display: inline-block;
    min-width: 50px;
    height: 50%;
  `,

  TradeDD: styled.dd`
    margin: 0;
    display: inline-block;
    height: 50%;
    color: ${({ fontColor }) => fontColor || "black"};
    font-weight: ${({ fontWeight }) => fontWeight || 500};
  `,
};

const CoinInfoHeader = ({
  theme,
  coinNameKor,
  coinSymbol,
  coinNameAndMarketEng,
  highestPrice24Hour,
  lowestPrice24Hour,
  changeRate24Hour,
  changePrice24Hour,
  tradePrice24Hour,
  volume24Hour,
  price,
}) => {
  const priceColor = changeRate24Hour > 0 ? theme.priceUp : theme.priceDown;
  return (
    <St.CoinInfoContainer>
      <St.CoinInfoMain>
        <St.CoinLogo coinSymbol={coinSymbol} />
        <St.CoinNameContainer>
          <St.CoinName>{coinNameKor}</St.CoinName>
          <St.CoinMarketName>{coinNameAndMarketEng}</St.CoinMarketName>
        </St.CoinNameContainer>
        <St.PriceInfo>
          <St.Price priceColor={priceColor}>
            {price.toLocaleString()}
            <St.PriceUnit priceColor={priceColor}>KRW</St.PriceUnit>
          </St.Price>
          <St.ChangeContainer>
            전일대비
            <St.ChangeRate priceColor={priceColor}>
              {changeRate24Hour}%
            </St.ChangeRate>
            <St.ChangePrice priceColor={priceColor}>
              {changePrice24Hour.toLocaleString()}
            </St.ChangePrice>
          </St.ChangeContainer>
        </St.PriceInfo>
      </St.CoinInfoMain>
      <St.TradeInfoContainer mobileMNone={true}>
        <St.InfoContainer tabletNone={true}>
          <St.TradeInfo minWidth={"100px"} borderColor={theme.lightGray2}>
            <St.TradeDT>고가</St.TradeDT>
            <St.TradeDD fontColor={theme.priceUp} fontWeight={800}>
              {highestPrice24Hour ? highestPrice24Hour.toLocaleString() : 0}
            </St.TradeDD>
          </St.TradeInfo>
          <St.TradeInfo minWidth={"100px"}>
            <St.TradeDT borderColor={theme.lightGray2}>저가</St.TradeDT>
            <St.TradeDD fontColor={theme.priceDown} fontWeight={800}>
              {lowestPrice24Hour ? lowestPrice24Hour.toLocaleString() : 0}
            </St.TradeDD>
          </St.TradeInfo>
        </St.InfoContainer>
        <St.InfoContainer mobileMNone={true}>
          <St.TradeInfo minWidth={"220px"} borderColor={theme.lightGray2}>
            <St.TradeDT>거래량(24h)</St.TradeDT>
            <St.TradeDD>{`${volume24Hour.toLocaleString()} ${coinSymbol}`}</St.TradeDD>
          </St.TradeInfo>
          <St.TradeInfo minWidth={"220px"}>
            <St.TradeDT borderColor={theme.lightGray2}>
              거래대금(24h)
            </St.TradeDT>
            <St.TradeDD>
              {tradePrice24Hour ? tradePrice24Hour.toLocaleString() : 0} KRW
            </St.TradeDD>
          </St.TradeInfo>
        </St.InfoContainer>
      </St.TradeInfoContainer>
    </St.CoinInfoContainer>
  );
};

export default withSelectedCoinName()(
  withSelectedCoinPrice()(withThemeData()(React.memo(CoinInfoHeader)))
);
