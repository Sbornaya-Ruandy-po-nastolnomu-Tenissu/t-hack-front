"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { useMemo } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import clsx from "clsx"
import { userStore } from "@/entities/user"

function genColor(n: number) {

  const grayColors = [];
  const start = 230; 
  const end = 30;
  const step = Math.floor((start - end) / (n - 1));

  for (let i = 0; i < n; i++) {
    const value = start - i * step;
    const hexValue = value.toString(16).padStart(2, "0"); 
		grayColors.push(`#${hexValue}${hexValue}${hexValue}`);
  }
  return grayColors;
}

const colors = genColor(5)

const chartData = [
  { rate: "Дринкит", amount: 270, fill: colors[0] },
  { rate: "Вкусно и точка", amount: 200, fill: colors[1] },
  { rate: "Т банк", amount: 287, fill: colors[2] },
  { rate: "Сбер", amount: 173, fill: colors[3] },
  { rate: "Другое", amount: 190, fill: colors[4] },
]

const chartConfig = {
  rate: {
    label: "Траты",
  }
} satisfies ChartConfig

var months = [
	"январь",
	"февраль",
	"март",
	"апрель",
	"май",
	"июнь",
	"июль",
	"август",
	"сентябрь",
	"октябрь",
	"ноябрь",
	"декабрь",
]

const DonutChart = ({ className }: { className?: string }) => {
	
	const user = userStore.getState().user
	if (!user) return <></>
	
	const total = useMemo(() => String(chartData.reduce((acc, curr) => acc + curr.amount, 0)), [])
	const monthNumber = useMemo(() => new Date().getMonth(), [])
	
	let rateSize = 1.8
	if (total.length > 5) { rateSize = 1.2 }
	
  return (
		<article className={clsx("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
				<CardTitle className="text-center">Траты за {months[monthNumber]}</CardTitle>
      </CardHeader>
			<CardContent className={"py-6"}>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="rate"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className={"fill-foreground font-bold"}
													style={{fontSize: `${rateSize}rem`}}
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                        потрачено
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter> */}
    </article>
  )
}

export { DonutChart }
