# The IoT Command Center

## The Tool

With this tool, we aim to provide the beginnings of an efficient front-end interface, suitable for controlling a growing number of IoT devices effectively, orchestrate more complex behaviros between devices, and allow users to make their own *smart* decisions with their smart home.

## Problem Statement

As the IoT movement is growing, the number of disparate smart home devices is consistently increasing. These devices will become more popular and affordable for users and, soon, these devices will become ubiquitous in everyday life.  Users in the near future will probably have a variety of IoT devices in their homes, ranging from smart fridges, smart thermostats, to smart doorbells. With this growth will come inconsistency in the APIs and methods of controlling the devices. Existing devices such as the Nest Thermostat, Ring Doorbell, and Samsung Smart TV all come with their interfaces, but dealing with so many disparate interfaces at once requires both a lot of work to learn the interface and a lot of effort to control the interface once learned, from the user’s point of view.

With such a large amount of IoT devices installed, the average user will need a easy to use, central control point from which to manage their IoT devices. This central interface will need to be scalable, to account for a home that has only 1 or 2 IoT devices, to a home that is almost entirely smart device connected. It will also need to be secure as well; since so many of these IoT devices are situated in spaces that are usually very private and personal, designers will need to ensure that control or access of these devices do not fall into the wrong hands. Finally, this interface should ideally present an universal interface that is understandable and translatable across different IoT standards as well, giving users one easy interface to work with in an Apple-esque fashion.


## User Classes

We define three user classes based on feedback during our interviews. Our interviewees would, most likely, fall under the Expert User category. However, their IoT devices are also used by others who live with them, including those who are non-experts or children. We categorize those non-experts into Average Users, and plan to make considerations for restricting behavior based on feedback about child permissions from our interviewee with children.

* **Average Users (A)** interact in consistent ways with the devices, regularly executing simple commands

* **Expert Users (E)** are users of above-average in technical ability, desire for customization, or reliance on IoT devices

* **Restricted Users (R)** have varying permission levels and are time-limited or functionality-limited

## User Goals
* Effectively control devices as their collection scales (A E R)
* Reduce energy consumption and make economic decisions using meaningful device feedback (A E R)
* Handle edge cases and malfunctions efficiently (A E R)
* Maintain device security by using permissions and restrictions placed on devices (A E)
* Use a centralized control, reducing the need to access multiple apps  (A E R)
* Customize complex behaviors across their devices (A E R)

<hr>

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks for a Create React App repository:
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).