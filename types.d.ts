type InternalMessage = "get-status" | "manual-check-in";
type BetaLogLevel = "info"|"warn"|"err";
type BetaLogHeading = "popup-open"|"popup-get-status"|"popup-display-info"|"popup-show-reward"|
	"manual-check-in"|"bg-loaded"|"bg-message"|"bg-status"|"browser-start"|
	"alarm"|"alarm-set"|"icon"|
	"fetch-home"|"fetch-info"|"fetch-sign"|"checkin";

interface AppAccount {
	name: string,
	cookie: AccountCookie,
	honkai: boolean,
	genshin: boolean
}

interface AccountCookie {
	"_MHYUUID": string,
	"mi18nLang": string,
	"account_id": string, //number,
	"cookie_token": string,
	"ltoken": string,
	"ltuid": string, //number,
}

interface CheckInResult {
	success: boolean;
	checkinAttempted: boolean;
	result: MihoyoInfo | null;
}

interface AppStatus{
	lastResult: CheckInResult | "error" | "incomplete" | null;
	lastRun: number;
	lastCheckin: number;
	nextRun: number;
}

interface MihoyoInfo{
	data: null | MihoyoCheckInData;
	message: string;
	retcode: -100 | 0;
}

interface MihoyoCheckInData{
	total_sign_day:number;
	today:string;
	is_sign:boolean;
	first_bind:boolean;
	is_sub?:boolean;//no idea what this means
	region?:string;//seems to just be ""
}

interface MihoyoHome{
	data: null | MihoyoRewardGallery;
	message: string;
	retcode: number;
}

interface MihoyoRewardGallery{
	month:number;
	awards:MihoyoReward[];
}

interface MihoyoReward{
	icon:string;
	name:string;
	cnt:number;
}

interface MihoyoCheckInResult {
	"retcode": 0 | -5003;
	"message": string;
	"data": MihoyoCheckInResultData;
}

interface MihoyoCheckInResultData {
	code: string;
}
