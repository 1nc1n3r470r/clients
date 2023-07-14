import { OverlayModule } from "@angular/cdk/overlay";
import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";

import { AsyncActionsModule } from "../async-actions";
import { ButtonModule } from "../button/button.module";

import { MenuDividerComponent } from "./menu-divider.component";
import { MenuItemComponent } from "./menu-item.component";
import { MenuTriggerForDirective } from "./menu-trigger-for.directive";
import { MenuComponent } from "./menu.component";

export default {
  title: "Component Library/Menu",
  component: MenuTriggerForDirective,
  decorators: [
    moduleMetadata({
      declarations: [
        MenuTriggerForDirective,
        MenuComponent,
        MenuItemComponent,
        MenuDividerComponent,
      ],
      imports: [OverlayModule, ButtonModule, AsyncActionsModule],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Zt3YSeb6E6lebAffrNLa0h/Tailwind-Component-Library?node-id=1881%3A17952",
    },
  },
} as Meta;

type Story = StoryObj<MenuTriggerForDirective>;

export const OpenMenu: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bit-menu #myMenu="menuComponent">
        <a href="#" bitMenuItem>Anchor link</a>
        <a href="#" bitMenuItem>Another link</a>
        <button type="button" bitMenuItem>Button</button>
        <bit-menu-divider></bit-menu-divider>
        <button type="button" bitMenuItem>Button after divider</button>
      </bit-menu>

      <div class="tw-h-40">
        <div class="cdk-overlay-pane bit-menu-panel">
          <ng-container *ngTemplateOutlet="myMenu.templateRef"></ng-container>
        </div>
      </div>
      `,
  }),
};
export const ClosedMenu: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="tw-h-40">
        <button bitButton buttonType="secondary" [bitMenuTriggerFor]="myMenu">Open menu</button>
      </div>

      <bit-menu #myMenu>
        <a href="#" bitMenuItem>Anchor link</a>
        <a href="#" bitMenuItem>Another link</a>
        <button type="button" bitMenuItem>Button</button>
        <bit-menu-divider></bit-menu-divider>
        <button type="button" bitMenuItem>Button after divider</button>
      </bit-menu>`,
  }),
};

type WithAsyncActionStory = StoryObj<unknown>;

export const WithAsyncAction: WithAsyncActionStory = {
  render: (args: object) => ({
    props: {
      action: () => new Promise((resolve) => setTimeout(resolve, 10000)),
      ...args,
    },
    template: `
      <div class="tw-h-40">
        <button bitButton buttonType="secondary" [bitMenuTriggerFor]="myMenu">Open menu</button>
      </div>

      <bit-menu #myMenu>
        <button type="button" bitMenuItem bitAsyncDisable>Some button</button>
        <button type="button" bitMenuItem bitAsyncDisable>Another button</button>
        <button type="button" bitMenuItem bitAsyncDisable>Yet another button</button>
        <bit-menu-divider></bit-menu-divider>
        <button type="button" bitMenuItem [bitAsyncClick]="action">Trigger async action</button>
      </bit-menu>`,
  }),
};
