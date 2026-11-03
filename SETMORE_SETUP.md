# Spartans Setmore booking

Booking page: https://spartansbarbershopsb02.setmore.com/

The website header, hero, service price menu, booking section and floating booking link use the configured Setmore URL. Customers complete their booking on Setmore. No API key or customer database is needed in this website.

## 店主需要在 Setmore 内完成的设置

1. 用店主账号登录正确的门店。核对服务名称、价格、时长，以及每项服务可选的员工。
2. 为每位员工建立独立员工资料、可预约服务、工作时段、休息和请假安排；核对门店时区。马来西亚门店应使用 Asia/Kuala_Lumpur（UTC+8）。
3. 为员工启用独立登录，按照当前后台的权限说明，选择只能访问和管理自己日历的权限。不要授予能查看全部员工日历的权限，也不要共享老板账号。具体权限名称和可用功能以当前 Setmore 套餐和后台为准。
4. 老板保留店主或具备全员日历访问能力的管理员权限，在日历中查看全部员工的预约。
5. 检查预约确认、员工通知、取消和改期规则，然后确认公开预约页面已启用。

## 上线前实际验收

- 从网站点击预约，确认进入此门店的 Setmore 页面，能选择服务、员工、日期和时间。
- 经店主同意后，用测试顾客信息创建两笔测试预约，分别指定不同员工，核对日期、时间、服务及通知。不要使用真实顾客资料做测试。
- 分别用两名员工的账号登录，确认各自只能看到允许查看的预约；尝试访问另一位员工的日历，确认权限确实阻止访问。
- 用老板账号确认能看到两人的预约，再取消测试预约并检查时段释放。

## 当前验证范围

本地浏览器测试检查网站预约入口及跳转目标；测试会拦截外部目标，不会创建真实预约。云环境对 Setmore 的只读访问被网络策略拒绝（代理 CONNECT 403），所以尚未核实真实页面、套餐、员工权限、排班或预约通知。网站链接不需要后端密钥；Setmore 后台设置须由有权限的门店账号完成。
