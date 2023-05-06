import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import { ElLoading } from 'element-plus/lib/components'
import type { ILoading } from './loading';

class LoadingClass implements ILoading {

  private g_contextLoading = <any>[];
  private globalLoadingNum = 0;
  private loadingInstance: LoadingInstance | null = null;
  private globalContext: HTMLElement | null = null;
  private closeGlobalInstanceTimeout: any = -1;

  constructor() {
    // 按照z-index规范，强制修改loading的z-index
    let style = document.createElement("style");
    style.innerHTML = `
            html .el-loading-mask {
                z-index: 1501;
            }
        `;
    document.head.appendChild(style);

  }

  setGlobalContext(context: HTMLElement) {
    this.globalContext = context;
  }

  add(context: HTMLElement) {
    if (!context) {
      if (this.globalLoadingNum <= 0) {
        if (this.loadingInstance) {
          clearTimeout(this.closeGlobalInstanceTimeout);
        } else {
          if (this.globalContext) {
            this.loadingInstance = ElLoading.service({
              lock: true,
              fullscreen: false,
              target: this.globalContext,
            });
          } else {
            this.loadingInstance = ElLoading.service({
              lock: true,
            });
          }
        }
      }
      this.globalLoadingNum++;
      return;
    }

    const existLoadingContext = this.g_contextLoading.find((item: any) => {
      return item.context === context;
    });

    if (existLoadingContext) {
      // 如果该元素已经在loading，则把loading的数值加1，不继续添加loading
      existLoadingContext.loadingNum++;
      return;
    }

    let contextLoading = ElLoading.service({
      lock: true,
      fullscreen: false,
      target: context,
    });

    this.g_contextLoading.push({
      context: context,
      loadingNum: 1,
      contextLoading,
    });
  }

  remove(context: HTMLElement) {
    if (!context) {
      this.globalLoadingNum--;
      if (this.globalLoadingNum <= 0) {
        this.delayCloseGlobalInstance();
      }
      return;
    }

    const existLoadingContext = this.g_contextLoading.find((item: any) => {
      return item.context === context;
    });
    if (!existLoadingContext) {
      return;
    }
    existLoadingContext.loadingNum--;
    // 如果该元素已经没有loading，则把loading去除
    if (existLoadingContext.loadingNum <= 0) {
      existLoadingContext.contextLoading.close();
      this.g_contextLoading = this.g_contextLoading.filter((item: any) => {
        return item.context != context;
      });
    }
  }

  clear() {
    this.globalLoadingNum = 0;

    this.loadingInstance && this.loadingInstance.close();
    this.loadingInstance = null;
  }

  /**
   * 全局loading延迟关闭，避免频繁的全局开启和关闭loading，出现闪屏的情况
   */
  delayCloseGlobalInstance() {
    clearTimeout(this.closeGlobalInstanceTimeout);
    this.closeGlobalInstanceTimeout = setTimeout(() => {
      this.loadingInstance && this.loadingInstance.close();
      this.loadingInstance = null;
    }, 300);
  }
}

const loading = new LoadingClass();

export default loading;
