export interface HistoricalSearch {
    symbols: string[],
    start: number,
    end: number,
    interval: number
}

interface CandlestickData {
    timestamp: number,
    high: number,
    low: number,
    open: number,
    close: number
}
export interface HistoricalData {
    name: string,
    symbol: string,
    image: string,
    data: CandlestickData[]
}

export interface StockInfo {
    symbol: string,
    image: string
}

interface StockData {
    timestamp: number,
    amount: number
}

export interface Stock {
    name: string,
    symbol: string,
    image: string,
    data: StockData[]
}


interface PrimaryChartData {
    name: string,
        x: number[],
        high: number[],
        low: number[],
        open: number[],
        close: number[],
        increasing: {
            line: {
                color: string
            }
        },
        decreasing: {
          line: {
            color: string,
            },
          fillcolor: string
        },
        line: {
            color: string},
        type: 'candlestick',
        xaxis: string,
        yaxis: string
}

export interface PrimaryChart {
    data: PrimaryChartData[],
    layout: {
        title: {
        text: string,
        font: {
            color: string
            }
        },
        plot_bgcolor: string,
        paper_bgcolor: string,
        candlestickmode: string,
        dragmode: string,
        showlegend: boolean,
        showgrid: boolean,
        legend: {
        orientation: string,
        y: number,
        font: {
            color: string
            }
        },
        xaxis: {
            type: {
                enumerated: string
            },
            tickangle: number,
            showgrid: boolean,
            autorange: boolean,
            zeroline: boolean,
            color: string,
            rangeslider: {
                visible: boolean,
                x: number, 
                y: number,
                xanchor: string,
                font: {
                    size: number
                },
            }
        },
        yaxis: {
            title: string,
            color: string, 
            autorange: boolean,
            zeroline: boolean
        }
    },
    config: {
        responsive: boolean,
        displayModeBar: boolean
    },
    style: {
        width: string
    }      
}

interface SecondaryChartData {
    x: string[],
    y: number[],
    mode: string,
    line: {
      color: string
    }
}

export interface SecondaryChart {
    data: SecondaryChartData[],
      layout: {
        title: {
          text: string,
          fontSize: string,
          xanchor: string,
          y: number,
          yanchor: string
        },
        plot_bgcolor: string,
        paper_bgcolor: string,
        autosize: boolean,
        titlefont: {
          color: string,
        },
        xaxis: {
          showgrid: boolean,
          showticklabels: boolean,
          zeroline: boolean
        },
        yaxis: {
          showgrid: boolean,
          showticklabels: boolean,
          zeroline: boolean
        }
      },
      config: {
        responsive: boolean,
        displayModeBar: boolean
      },
      style: {
        height: string
      }
}